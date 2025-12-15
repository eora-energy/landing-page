import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Test Brevo connection endpoint
app.get('/api/test-brevo', async (req, res) => {
  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({ 
      error: 'BREVO_API_KEY not configured',
      configured: {
        apiKey: false,
        listId: !!process.env.BREVO_LIST_ID
      }
    });
  }

  try {
    // Test API key con una semplice chiamata GET
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      }
    });

    if (response.ok) {
      const data = await response.json();
      return res.json({
        success: true,
        message: 'Brevo connection successful',
        account: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName
        },
        configured: {
          apiKey: true,
          listId: !!process.env.BREVO_LIST_ID,
          listIdValue: process.env.BREVO_LIST_ID
        }
      });
    } else {
      const text = await response.text();
      return res.status(500).json({
        error: 'Brevo API error',
        status: response.status,
        message: text
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Connection failed',
      message: error.message
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/subscribe', async (req, res) => {
  const { name, email } = req.body;

  // Validazione base
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }

  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }

  try {
    // Chiamata API Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: name
        },
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true // Aggiorna se il contatto esiste già
      })
    });

    // Log della risposta per debug
    console.log('📡 Brevo response status:', response.status);
    
    // Gestione risposta vuota o non-JSON
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('❌ JSON parse error:', jsonError);
        data = {};
      }
    } else {
      const text = await response.text();
      console.log('📄 Non-JSON response:', text);
      data = { message: text };
    }

    if (response.ok || response.status === 201) {
      console.log('✅ Contact added:', email);
      return res.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
      });
    } else {
      // Log dell'errore completo
      console.error('❌ Brevo API error:');
      console.error('   Status:', response.status);
      console.error('   Data:', data);
      
      // Gestione errori specifici
      if (response.status === 400 && data.code === 'duplicate_parameter') {
        console.log('ℹ️  Email already exists:', email);
        return res.json({ 
          success: true, 
          message: 'Email already subscribed' 
        });
      }
      
      if (response.status === 401) {
        console.error('❌ INVALID API KEY! Check your .env file');
        return res.status(500).json({ 
          error: 'Configuration error. Please contact support.' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to subscribe. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('❌ Server error:', error.message);
    console.error('Full error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Brevo integration active`);
  
  // Check env variables
  if (!process.env.BREVO_API_KEY) {
    console.warn('⚠️  WARNING: BREVO_API_KEY not set in .env file!');
  }
  if (!process.env.BREVO_LIST_ID) {
    console.warn('⚠️  WARNING: BREVO_LIST_ID not set in .env file!');
  }
});