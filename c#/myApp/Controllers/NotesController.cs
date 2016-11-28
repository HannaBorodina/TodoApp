using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mocoding.EasyDocDb;
using myApp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace myApp.Controllers
{
    public class NotesController : Controller
    {
        private IDocumentCollection<Note> _notes;

        public NotesController(IDocumentCollection<Note> notes)
        {
            _notes = notes;
        }

        // GET: /<controller>/
        public IActionResult List()
        {
            var notes = _notes.Documents.Select(n => n.Data);
            return View(notes);
        }

        public IActionResult Create()
        {
            return View(new Note());
        }

        [HttpPost]
        public async Task<IActionResult> Create(Note note)
        {
            var newNote = _notes.New();
            newNote.Data.Text = note.Text;
            await newNote.Save();
            return RedirectToAction("List");
        }

        public IActionResult Delete(string id)
        {
            return View(_notes.Documents.First(e => e.Data.ID == id).Data);
        }

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteComfirm(string id)
        {
            var note = _notes.Documents.First(e => e.Data.ID == id);
            await note.Delete();
            return RedirectToAction("List");
        }

        public IActionResult Edit(string id)
        {
            return View(_notes.Documents.First(e => e.Data.ID == id).Data);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Note note)
        {
            var curr = _notes.Documents.First(e => e.Data.ID == note.ID);
            await curr.SyncUpdate(n => { n.Text = note.Text;});
            return RedirectToAction("List");
        }

        public IActionResult Detailes(string id)
        {
            return View(_notes.Documents.First(e => e.Data.ID == id).Data);
        }
    }
}
