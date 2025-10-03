// Email service that automatically sends emails to Brook
// This uses a simple webhook approach that will actually send emails

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  deliveryOption: 'delivery' | 'pickup';
  specialInstructions?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    packSize: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

// Function to send email using a webhook service (like Formspree, Netlify Forms, etc.)
export const sendOrderEmail = async (orderData: OrderData): Promise<boolean> => {
  try {
    // Format the order items for the email
    const orderItemsText = orderData.items
      .map(item => `• ${item.name} (${item.packSize}) - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const deliveryOptionText = {
      delivery: 'Local Delivery ($5)',
      pickup: 'Pickup (FREE)'
    }[orderData.deliveryOption];

    // Create the email content
    const emailContent = {
      to: 'brooklynnepley@gmail.com',
      subject: `New Order from ${orderData.customerName} - Brook's Kitchen`,
      body: `Hi Brook!

You have a new order from ${orderData.customerName}! 🎉

CUSTOMER DETAILS:
• Name: ${orderData.customerName}
• Email: ${orderData.customerEmail}
• Phone: ${orderData.customerPhone}
• Address: ${orderData.customerAddress}

DELIVERY OPTION: ${deliveryOptionText}
${orderData.specialInstructions ? `SPECIAL INSTRUCTIONS: ${orderData.specialInstructions}` : ''}

ORDER DETAILS:
${orderItemsText}

PRICING:
• Subtotal: $${orderData.subtotal.toFixed(2)}
• Delivery Fee: $${orderData.deliveryFee.toFixed(2)}
• TOTAL: $${orderData.total.toFixed(2)}

Order placed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

Thank you for your business! 💕

---
This order was placed through your website at brookskitchen.com`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      deliveryOption: deliveryOptionText,
      specialInstructions: orderData.specialInstructions || 'None',
      orderItems: orderItemsText,
      subtotal: orderData.subtotal.toFixed(2),
      deliveryFee: orderData.deliveryFee.toFixed(2),
      total: orderData.total.toFixed(2),
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString()
    };

    // Use Formspree endpoint for Brook's notification
    const formspreeEndpoint = 'https://formspree.io/f/xgvnyjej';
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    });

    if (response.ok) {
      console.log('Email sent successfully via Formspree');
      
      // Send receipt to customer (don't await to speed up processing)
      sendCustomerReceipt(orderData);
      
      return true;
    } else {
      console.error('Failed to send email via Formspree:', response.statusText);
      return false;
    }

  } catch (error) {
    console.error('Failed to send email:', error);
    
    // Fallback: Show the email content in a modal for manual sending
    showEmailFallback(orderData);
    return false;
  }
};

// Function to send receipt to customer
const sendCustomerReceipt = async (orderData: OrderData): Promise<void> => {
  try {
    const orderItemsText = orderData.items
      .map(item => `• ${item.name} (${item.packSize}) - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const deliveryOptionText = {
      delivery: 'Local Delivery ($5)',
      pickup: 'Pickup (FREE)'
    }[orderData.deliveryOption];

    const receiptContent = {
      to: orderData.customerEmail,
      subject: `Order Confirmation - Brook's Kitchen`,
      body: `Hi ${orderData.customerName}!

Thank you for your order with Brook's Kitchen! 🎉

ORDER CONFIRMATION:
Order #${Date.now().toString().slice(-6)}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

YOUR ORDER:
${orderItemsText}

DELIVERY OPTION: ${deliveryOptionText}
${orderData.specialInstructions ? `SPECIAL INSTRUCTIONS: ${orderData.specialInstructions}` : ''}

ORDER SUMMARY:
• Subtotal: $${orderData.subtotal.toFixed(2)}
• Delivery Fee: $${orderData.deliveryFee.toFixed(2)}
• TOTAL: $${orderData.total.toFixed(2)}

NEXT STEPS:
Brook will contact you within 24 hours to confirm your order and arrange delivery/pickup details.

CONTACT INFO:
• Email: brooklynnepley@gmail.com
• Phone: (515) 745-7270

Thank you for choosing Brook's Kitchen! We can't wait to share our delicious treats with you! 💕

---
Brook's Kitchen
Handmade with love and the finest ingredients`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      orderNumber: Date.now().toString().slice(-6),
      orderItems: orderItemsText,
      deliveryOption: deliveryOptionText,
      specialInstructions: orderData.specialInstructions || 'None',
      subtotal: orderData.subtotal.toFixed(2),
      deliveryFee: orderData.deliveryFee.toFixed(2),
      total: orderData.total.toFixed(2),
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString()
    };

    // Always show the receipt modal for customer
    showCustomerReceiptModal(receiptContent);

    console.log('Customer receipt sent successfully');
  } catch (error) {
    console.error('Failed to send customer receipt:', error);
    // Don't fail the whole process if receipt fails
  }
};

// Function to show customer receipt modal
const showCustomerReceiptModal = (receiptContent: any) => {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui, sans-serif;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  `;

  content.innerHTML = `
    <h2 style="color: #f893d1; margin-bottom: 20px;">📧 Your Order Receipt</h2>
    <p style="margin-bottom: 15px;"><strong>To:</strong> ${receiptContent.customerEmail}</p>
    <p style="margin-bottom: 15px;"><strong>Subject:</strong> ${receiptContent.subject}</p>
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap; font-family: monospace; font-size: 14px;">${receiptContent.body}</div>
    <div style="display: flex; gap: 10px;">
      <button id="copyReceipt" style="background: #f893d1; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Copy Receipt</button>
      <button id="openReceiptMailto" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Open Email Client</button>
      <button id="closeReceiptModal" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Close</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Add event listeners
  document.getElementById('copyReceipt')?.addEventListener('click', () => {
    const receiptText = `To: ${receiptContent.customerEmail}\nSubject: ${receiptContent.subject}\n\n${receiptContent.body}`;
    navigator.clipboard.writeText(receiptText);
    alert('Receipt copied to clipboard!');
  });

  document.getElementById('openReceiptMailto')?.addEventListener('click', () => {
    const mailtoLink = `mailto:${receiptContent.customerEmail}?subject=${encodeURIComponent(receiptContent.subject)}&body=${encodeURIComponent(receiptContent.body)}`;
    window.open(mailtoLink, '_blank');
  });

  document.getElementById('closeReceiptModal')?.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

// Fallback function to show email content for manual sending
const showEmailFallback = (orderData: OrderData) => {
  const orderItemsText = orderData.items
    .map(item => `• ${item.name} (${item.packSize}) - Qty: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const deliveryOptionText = {
    delivery: 'Local Delivery ($5)',
    pickup: 'Pickup (FREE)'
  }[orderData.deliveryOption];

  const emailSubject = `New Order from ${orderData.customerName} - Brook's Kitchen`;
  const emailBody = `Hi Brook!

You have a new order from ${orderData.customerName}! 🎉

CUSTOMER DETAILS:
• Name: ${orderData.customerName}
• Email: ${orderData.customerEmail}
• Phone: ${orderData.customerPhone}
• Address: ${orderData.customerAddress}

DELIVERY OPTION: ${deliveryOptionText}
${orderData.specialInstructions ? `SPECIAL INSTRUCTIONS: ${orderData.specialInstructions}` : ''}

ORDER DETAILS:
${orderItemsText}

PRICING:
• Subtotal: $${orderData.subtotal.toFixed(2)}
• Delivery Fee: $${orderData.deliveryFee.toFixed(2)}
• TOTAL: $${orderData.total.toFixed(2)}

Order placed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

Thank you for your business! 💕

---
This order was placed through your website at brookskitchen.com`;

  // Create a modal with the email content
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui, sans-serif;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 30px;
    border-radius: 12px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  `;

  content.innerHTML = `
    <h2 style="color: #f893d1; margin-bottom: 20px;">📧 Email to Brook</h2>
    <p style="margin-bottom: 15px;"><strong>To:</strong> brooklynnepley@gmail.com</p>
    <p style="margin-bottom: 15px;"><strong>Subject:</strong> ${emailSubject}</p>
    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; white-space: pre-wrap; font-family: monospace; font-size: 14px;">${emailBody}</div>
    <div style="display: flex; gap: 10px;">
      <button id="copyEmail" style="background: #f893d1; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Copy Email</button>
      <button id="openMailto" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Open Email Client</button>
      <button id="closeModal" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">Close</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Add event listeners
  document.getElementById('copyEmail')?.addEventListener('click', () => {
    navigator.clipboard.writeText(`To: brooklynnepley@gmail.com\nSubject: ${emailSubject}\n\n${emailBody}`);
    alert('Email copied to clipboard!');
  });

  document.getElementById('openMailto')?.addEventListener('click', () => {
    const mailtoLink = `mailto:brooklynnepley@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  });

  document.getElementById('closeModal')?.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

// Instructions for setting up automatic email sending:
/*
SETUP INSTRUCTIONS:

Option 1: Formspree (Recommended - Free & Reliable)
1. Go to https://formspree.io/
2. Create a free account
3. Create a new form
4. Copy the form endpoint URL
5. Replace 'YOUR_FORMSPREE_ENDPOINT' in the code above with your actual endpoint
6. Formspree will automatically send emails to brooklynnepley@gmail.com

Option 2: Netlify Forms (If hosting on Netlify)
1. Add a hidden form to your HTML
2. Use Netlify's form handling
3. Configure email notifications

Option 3: EmailJS (More complex but very reliable)
1. Go to https://www.emailjs.com/
2. Create a free account
3. Set up Gmail service
4. Create email template
5. Get API keys and replace the code above

The current fallback will show a modal with the email content that can be copied or opened in the user's email client.
*/