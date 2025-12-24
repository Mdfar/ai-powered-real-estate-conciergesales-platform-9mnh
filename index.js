require('dotenv').config(); const express = require('express'); const { OpenAI } = require('openai'); const hubspot = require('@hubspot/api-client'); const twilio = require('twilio'); const WebSocket = require('ws');

const app = express(); app.use(express.json()); app.use(express.urlencoded({ extended: false }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN }); const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**

Endpoint: Incoming Webhook from Real Estate Portal (e.g., Zillow/Website) */ app.post('/incoming-lead', async (req, res) => { const { email, phone, name, source } = req.body;

try { // 1. Create/Update Contact in CRM const contactObj = { properties: { email, firstname: name, phone, lead_source: source } }; const searchResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj);

 // 2. Trigger AI Concierge SMS
 await twilioClient.messages.create({
     body: `Hi ${name}, I'm the AI Assistant for staqlt Realty. I saw you're interested in properties in this area. Do you have 2 minutes to chat about your budget?`,
     from: process.env.TWILIO_PHONE,
     to: phone
 });

 res.status(200).send({ status: 'Lead Captured & Concierge Engaged' });


} catch (err) { console.error('Lead Entry Error:', err); res.status(500).send('Internal Server Error'); } });

/**

Endpoint: Twilio SMS Webhook for AI Conversation */ app.post('/sms-webhook', async (req, res) => { const userMsg = req.body.Body; const userPhone = req.body.From;

// Call OpenAI to generate a contextual, qualifying response const completion = await openai.chat.completions.create({ model: "gpt-4-turbo-preview", messages: [ { role: "system", content: "You are a Real Estate Concierge. Qualify the lead on budget, timeline, and location. If they provide a budget > $500k, tell them a human specialist will call shortly." }, { role: "user", content: userMsg } ] });

const aiResponse = completion.choices[0].message.content;

// Send AI reply via Twilio const twiml = new twilio.twiml.MessagingResponse(); twiml.message(aiResponse);

res.type('text/xml').send(twiml.toString()); });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log(staqlt Real Estate Concierge running on port ${PORT}));