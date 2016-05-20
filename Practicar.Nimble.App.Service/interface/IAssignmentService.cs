using Practicar.Nimble.App.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace Practicar.Nimble.App.Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IAssignmentService" in both code and config file together.
    [ServiceContract]
    public interface IAssignmentService
    {
        [OperationContract]
        [WebGet(UriTemplate = "/Teste")]
        string Teste();

        [WebInvoke(Method = "POST",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "/Update/{id}")]
        [OperationContract]

        string Update(Post<Assignment> value,string id);
    }

}
