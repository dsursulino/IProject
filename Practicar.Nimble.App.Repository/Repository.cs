using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Practicar.Nimble.App.Domain.Entity;
using infra =Practicar.Nimble.Infra;
namespace Practicar.Nimble.App.Repository
{
    public class Repository
    {
        protected oAuth _oAuth { get; set; }

     //   public Repository() { }
        public Repository(oAuth oAuth_)
        {
            this._oAuth = oAuth_;

        }

        protected infra.Office365Conect GetContext365(string url = null)
        {
            if (url == null)
                url = _oAuth.ProjectURL;
            return new infra.Office365Conect(url, AESEncrytDecry.DecryptStringAES(_oAuth.User.Login), AESEncrytDecry.DecryptStringAES(_oAuth.User.Password));
        }
    }
}
