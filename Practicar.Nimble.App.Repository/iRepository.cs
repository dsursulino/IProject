using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Practicar.Nimble.App.Repository
{
    public interface iRepository<entity,typeID>
    {

        void Add(entity item);
        IEnumerable<entity> GetAll();
        entity Find(typeID key);
        entity Remove(typeID key);
        void Update(entity item);

    }
}
