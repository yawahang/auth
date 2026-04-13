using ProductEntity = Core.DataAccess.Context.Entities.Product;

namespace Core.DataAccess.Repositories.Product;

public interface IProductRepository
{
    Task<IEnumerable<ProductEntity>> GetAllAsync();
    Task<ProductEntity?> GetByIdAsync(int id);
    Task<ProductEntity> CreateAsync(ProductEntity product);
    Task UpdateAsync(ProductEntity product);
    Task DeleteAsync(ProductEntity product);
    Task<bool> ExistsAsync(int id);
}
