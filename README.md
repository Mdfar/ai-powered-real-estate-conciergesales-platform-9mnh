staqlt AI Real Estate Concierge

This project implements an automated AI-driven lead qualification and CRM integration platform specifically designed for high-volume real estate agencies.

Core Features

Instant Lead Capture: Connects via webhooks to major real estate portals.

AI Qualification: Uses OpenAI's GPT-4 to handle natural language conversations over SMS.

CRM Sync: Automatically creates and updates contact records in HubSpot.

Speed to Lead: Reduces manual friction by engaging prospects in seconds.

Setup Instructions

Clone this repository.

Run npm install.

Create a .env file with the following:

OPENAI_API_KEY

HUBSPOT_ACCESS_TOKEN

TWILIO_SID

TWILIO_AUTH_TOKEN

TWILIO_PHONE

Deploy to a public URL (e.g., Heroku or ngrok) and point your Twilio SMS Webhook to /sms-webhook.