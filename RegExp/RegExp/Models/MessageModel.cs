using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;
namespace RegExp.Models
{
    public class MessageModel
    {
        [Required]
        [EmailAddress]
        public string From { get; set; }

        [StringLength(50)]
        public string Subject { get; set; }

        [Required]
        [StringLength(2000)]
        public string Body { get; set; }
    }
}
