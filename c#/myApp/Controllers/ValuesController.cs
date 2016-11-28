using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mocoding.EasyDocDb;
using myApp.Models;
using System.Web.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace myApp.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {

        private IDocumentCollection<Note> _notes;
        public ValuesController(IDocumentCollection<Note> notes)
        {
            _notes = notes;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Note> Get()
        {
            return _notes.Documents.Select(n => n.Data).OrderBy(n => n.ID);            
        }
        
        //GET api/values/5
        [HttpGet("{id}")]
        public Note Get(string id)
        {
            return _notes.Documents.First(e => e.Data.ID == id).Data; 
        }

        // POST api/values
        [HttpPost]
        public async Task Post([FromBody]Note note)
        {
            var newNote = _notes.New();
            newNote.Data.ID = note.ID;
            newNote.Data.Text = note.Text;
            await newNote.Save();
            Get();
        }


        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task Put([FromBody]Note note)
        {
            var curr = _notes.Documents.First(e => e.Data.ID == note.ID);
            await curr.SyncUpdate(n => { n.Text = note.Text;});
            Get();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            var note = _notes.Documents.First(e => e.Data.ID == id);
            await note.Delete();
            Get();
        }
    }
}