namespace Core.DataAccess.Context.Entities;

public record Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required decimal Price { get; set; }
}
