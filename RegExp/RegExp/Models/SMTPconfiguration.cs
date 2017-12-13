using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegExp.Models
{
    public class SMTPconfiguration
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string To { get; set; }


    }
}
