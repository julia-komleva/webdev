using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RegExp.Models; 
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace RegExp.Controllers
{
    public class ContactController : Controller
    {
        private readonly SMTPconfiguration _SMTPconfiguration;

        public ContactController(IOptions<SMTPconfiguration> smtpConfiguration)
        {
            _SMTPconfiguration = smtpConfiguration.Value;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Send(MessageModel messageModel)
        {
            var To = _SMTPconfiguration.To;
            var Password = _SMTPconfiguration.Password;
            var Port = _SMTPconfiguration.Port;
            var Host = _SMTPconfiguration.Host;

            try
            {
                SmtpClient smtpClient = new SmtpClient(Host, Port);
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Credentials = new NetworkCredential(To, Password);

                MailAddress from = new MailAddress(To, messageModel.From);
                MailMessage message = new MailMessage(messageModel.From, To, messageModel.Subject, messageModel.Body);
                message.From = from; // добавлен адрес для обратной связи во From

          
                smtpClient.Send(message);

                ViewBag.Success = "SUCCESS";
                message.Dispose();
            }
            catch (Exception e)
            {
                ViewBag.Error = "FAIL " + e.Message;
                
            }
            

            // return RedirectToAction("Index");
            
            return View("Index");

        }
    }
}