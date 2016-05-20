using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using Practicar.Nimble.App.Domain.Entity;
using System.ServiceModel.Activation;
using System.Security.Cryptography;

namespace Practicar.Nimble.App.Service
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class AssignmentService : IAssignmentService
    {
        public string Teste()
        {
            return "Practicar";
        }

        public string Update(Post<Assignment> value,string id)
        {
            new Practicar.Nimble.App.Repository.AssignmentREP(value._oAuth).Update(value._value);

            return "Sucesso.";
        }


      
    }
}
