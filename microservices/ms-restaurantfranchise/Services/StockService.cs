using Interfaces;
using Models;
using Newtonsoft.Json;

namespace Services
{

    public class StockService : IStockService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public StockService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<List<Stock>> GetStockAsync(int restaurantId)
        {
            var baseUrl = _configuration["GestionStockUrl"];
            var apiUrl = $"{baseUrl}/Stock/restaurant/{restaurantId}";

            var response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseContent);
                var stockItems = JsonConvert.DeserializeObject<List<Stock>>(responseContent);
                return stockItems;
            }
            else
            {
                throw new Exception($"Failed to retrieve stock data. Status code: {response.StatusCode}");
            }
        }

    }
}
