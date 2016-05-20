using Practicar.Nimble.App.Domain.Entity;
using infra = Practicar.Nimble.Infra;
using Project = Microsoft.ProjectServer.Client;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Practicar.Nimble.App.Repository
{
    public class AssignmentREP : Repository, iRepository<Assignment, Guid>
    {
        public AssignmentREP(oAuth oAuth_) : base(oAuth_)
        {
        }
        public void Add(Assignment item)
        {
            throw new NotImplementedException();
        }

        public Assignment Find(Guid key)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<Assignment> GetAll()
        {
            try
            {
                var values = new List<Assignment>();

                for (decimal i = 0; i < 35; i++)
                {
                    values.Add(new Assignment() { AssignmentId = Guid.NewGuid(), AssignmentPercentWorkCompleted = 1 });
                }

                return values;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public Assignment Remove(Guid key)
        {
            throw new NotImplementedException();
        }

        public void Update(Assignment item)
        {
            try
            {
                using (var projContext = GetContext365().ObterContextoPWA())
                {
                    var er = projContext.EnterpriseResources.GetById(item.ResourceId.ToString());
                    var _Assignment = er.Assignments.GetById(item.AssignmentId.ToString());
                    projContext.Load(_Assignment);
                    projContext.ExecuteQuery();
                    _Assignment.PercentComplete = item.AssignmentPercentWorkCompleted;
                    _Assignment.Comments = item.AssignmentComment;
                    _Assignment.SubmitStatusUpdates("Enviado por Nimble App: " + item.AssignmentComment);
                    er.Assignments.Update();
                    projContext.ExecuteQuery();

                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
