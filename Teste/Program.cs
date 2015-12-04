
using Microsoft.Online.SharePoint.TenantAdministration;
using Microsoft.SharePoint.Client;
using System;
using System.Security;

namespace Teste
{
    class Program
    {
        static void Main(string[] args)
        {
            // Open the Tenant Administration Context with the Tenant Admin Url
            using (var tenantContext = new ClientContext("https://practicarcloud-admin.sharepoint.com/"))
            {
                //Authenticate with a Tenant Administrator
                var passWord = new SecureString();
                foreach (char c in "j9x7a2q2!".ToCharArray()) passWord.AppendChar(c);
                tenantContext.Credentials = new SharePointOnlineCredentials("dursulino@practicar.com.br", passWord);

                var tenant = new Tenant(tenantContext);

                var tenantLog = new TenantLog(tenantContext);

                var dateTimeUTCNow = DateTime.UtcNow;
                //Get 50 Rows of Tenant Log Entries starting from 5 days ago till now.
                var logEntries = tenantLog.GetEntries(dateTimeUTCNow.AddDays(-10), dateTimeUTCNow,50);

                //Get 50 Rows of Tenant Log Entries of the specified CorrelationId starting from 5 days ago till now
                //var logEntries = tenantLog.GetEntriesByCorrelationId(dateTimeUTCNow.AddDays(-5), dateTimeUTCNow, 50, new Guid("ae2b1e34-12eb-4652-a0db-ce4ab916c74e"));

                //Get 50 Rows of Tenant Log Entries of the specified Source starting from 5 days ago till now.
                //var logEntries = tenantLog.GetEntriesBySource(dateTimeUTCNow.AddDays(-5), dateTimeUTCNow, 50, 1);

                //Get 50 Rows of Tenant Log Entries of the specified User starting from 5 days ago till now.
                //var logEntries = tenantLog.GetEntriesByUser(dateTimeUTCNow.AddDays(-5), dateTimeUTCNow, 50, "admin@yoursite.onmicrosoft.com");

                tenantContext.Load(logEntries);

                tenantContext.ExecuteQuery();

                foreach (TenantLogEntry logEntry in logEntries)
                {
                    Console.WriteLine(string.Format("Timestamp:{0} | Message:{1} | CorrelationId:{2} | Source:{3} | User:{4} | CategoryId:{5}",
                        logEntry.TimestampUtc, logEntry.Message, logEntry.CorrelationId, logEntry.Source, logEntry.User, logEntry.CategoryId));
                }

                Console.WriteLine("Press Any Key to Exit...");
                Console.ReadKey();
            }
        }
    }
}
