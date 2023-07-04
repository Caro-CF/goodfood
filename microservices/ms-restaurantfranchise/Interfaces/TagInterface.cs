using Models;

namespace Interfaces
{
    public interface ITagService
    {
        IEnumerable<Tag> GetAllTags();
        Tag? GetTagById(int id);
        void AddTag(Tag tag);
    }
}
