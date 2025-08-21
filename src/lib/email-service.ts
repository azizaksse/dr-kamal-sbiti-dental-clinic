import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { AppointmentData } from './google-calendar';

// Email templates
const PATIENT_EMAIL_TEMPLATE = (appointment: AppointmentData, clinic: { name: string; phone: string; address: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Appointment Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .appointment-details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #2563eb; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmed!</h1>
    </div>
    <div class="content">
      <p>Dear ${appointment.patientName},</p>
      
      <p>Your dental appointment has been successfully scheduled. Here are the details:</p>
      
      <div class="appointment-details">
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Service:</strong> ${appointment.serviceType}</p>
        ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
      </div>
      
      <div class="appointment-details">
        <h3>Clinic Information</h3>
        <p><strong>Clinic:</strong> ${clinic.name}</p>
        <p><strong>Phone:</strong> ${clinic.phone}</p>
        <p><strong>Address:</strong> ${clinic.address}</p>
      </div>
      
      <p><strong>Important Reminders:</strong></p>
      <ul>
        <li>Please arrive 15 minutes early for your appointment</li>
        <li>Bring a valid ID and insurance cards</li>
        <li>If you need to reschedule or cancel, please call us at least 24 hours in advance</li>
      </ul>
      
      <p>We look forward to seeing you!</p>
    </div>
    <div class="footer">
      <p>This confirmation was sent to ${appointment.patientEmail}</p>
      <p>If you have any questions, please contact us at ${clinic.phone}</p>
    </div>
  </div>
</body>
</html>
`;

const CLINIC_EMAIL_TEMPLATE = (appointment: AppointmentData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Appointment Scheduled</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #059669; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .patient-details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #059669; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Appointment Scheduled</h1>
    </div>
    <div class="content">
      <p>A new appointment has been scheduled through your website:</p>
      
      <div class="patient-details">
        <h3>Patient Information</h3>
        <p><strong>Name:</strong> ${appointment.patientName}</p>
        <p><strong>Email:</strong> ${appointment.patientEmail}</p>
        <p><strong>Phone:</strong> ${appointment.patientPhone}</p>
      </div>
      
      <div class="patient-details">
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Service:</strong> ${appointment.serviceType}</p>
        ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
      </div>
      
      <p>This appointment has been automatically added to your Google Calendar.</p>
    </div>
  </div>
</body>
</html>
`;

// Create email transporter
function createEmailTransporter() {
  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing email configuration: ${envVar}`);
    }
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Send confirmation email to patient
export async function sendPatientConfirmation(appointment: AppointmentData): Promise<void> {
  try {
    const transporter = createEmailTransporter();
    
    const clinicInfo = {
      name: process.env.CLINIC_NAME || 'Dental Clinic',
      phone: process.env.CLINIC_PHONE || 'Not provided',
      address: process.env.CLINIC_ADDRESS || 'Not provided',
    };

    const mailOptions = {
      from: `"${clinicInfo.name}" <${process.env.SMTP_USER}>`,
      to: appointment.patientEmail,
      subject: `Appointment Confirmation - ${format(new Date(appointment.date), 'MMM dd, yyyy')}`,
      html: PATIENT_EMAIL_TEMPLATE(appointment, clinicInfo),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Patient confirmation email sent to ${appointment.patientEmail}`);
  } catch (error) {
    console.error('Error sending patient confirmation email:', error);
    throw new Error('Failed to send patient confirmation email');
  }
}

// Send notification email to clinic
export async function sendClinicNotification(appointment: AppointmentData): Promise<void> {
  try {
    const transporter = createEmailTransporter();
    
    const clinicEmail = process.env.CLINIC_EMAIL;
    if (!clinicEmail) {
      throw new Error('Clinic email not configured');
    }


    const mailOptions = {
      from: `"Website Bookings" <${process.env.SMTP_USER}>`,
      to: clinicEmail,
      subject: `New Appointment: ${appointment.patientName} - ${format(new Date(appointment.date), 'MMM dd, yyyy')}`,
      html: CLINIC_EMAIL_TEMPLATE(appointment),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Clinic notification email sent to ${clinicEmail}`);
  } catch (error) {
    console.error('Error sending clinic notification email:', error);
    throw new Error('Failed to send clinic notification email');
  }
}

// Send appointment reminder email
export async function sendAppointmentReminder(
  appointment: AppointmentData
): Promise<void> {
  try {
    const transporter = createEmailTransporter();
    
    const clinicInfo = {
      name: process.env.CLINIC_NAME || 'Dental Clinic',
      phone: process.env.CLINIC_PHONE || 'Not provided',
      address: process.env.CLINIC_ADDRESS || 'Not provided',
    };

    const reminderTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Appointment Reminder</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .appointment-details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #f59e0b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Reminder</h1>
    </div>
    <div class="content">
      <p>Dear ${appointment.patientName},</p>
      
      <p>This is a reminder about your upcoming dental appointment:</p>
      
      <div class="appointment-details">
        <h3>Appointment Details</h3>
        <p><strong>Date:</strong> ${format(new Date(appointment.date), 'MMMM dd, yyyy')}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Service:</strong> ${appointment.serviceType}</p>
      </div>
      
      <p><strong>Please remember to:</strong></p>
      <ul>
        <li>Arrive 15 minutes early</li>
        <li>Bring your ID and insurance cards</li>
        <li>Call ${clinicInfo.phone} if you need to reschedule</li>
      </ul>
      
      <p>We look forward to seeing you tomorrow!</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"${clinicInfo.name}" <${process.env.SMTP_USER}>`,
      to: appointment.patientEmail,
      subject: `Reminder: Your appointment tomorrow at ${appointment.time}`,
      html: reminderTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Appointment reminder sent to ${appointment.patientEmail}`);
  } catch (error) {
    console.error('Error sending appointment reminder:', error);
    throw new Error('Failed to send appointment reminder');
  }
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = createEmailTransporter();
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}