import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:7004/api';

export const getStockLevels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StockHistory/GetStockLevels`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

export const getProductById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/Products/${id}`);
    return response.data;
  };
  export const uploadImage = async (image: any): Promise<string> => {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.fileName || 'image.jpg',
      type: image.type || 'image/jpeg',
    });
  
    const res = await axios.post(`${API_BASE_URL}/Products/UploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    return res.data.imagePath; // تأكد أن backend يرجع هذا المفتاح
  };
  
  // ⬆️ تحديث المنتج عبر API
  export const updateProductById = async (id: number, product: any) => {
    const payload = {
      name: product.name,
      categoryId: product.categoryId || 1, // مثال: تأكد من تمرير قيمة موجودة
      price: product.price,
      barcode: product.barcode,
      quantity: product.quantity,
      status: product.status || 1, // يمكن تعديلها حسب الحالة
      unitMeasurement: product.unitMeasurement,
      description: product.description || '', // اجعلها اختيارية
      imagePath: product.imagePath,
    };
  
    await axios.put(`${API_BASE_URL}/Products/${id}`, payload);
  };


  // Define the CreateProductPayload type
  interface CreateProductPayload {
    name: string;
    categoryId: number;
    price: number;
    barcode: string;
    quantity: number;
    status: number;
    supplierId: number;
    inventoryId: number;
    unitMeasurement: string;
    description: string;
    imagePath: string;
  }
  
  export const createProduct = async (productData: CreateProductPayload) => {
    const payload = {
      name: productData.name,
      categoryId: productData.categoryId,
      price: productData.price,
      barcode: productData.barcode,
      quantity: productData.quantity,
      status: productData.status,
      supplierId: productData.supplierId,
      inventoryId: productData.inventoryId,
      unitMeasurement: productData.unitMeasurement,
      description: productData.description,
      imagePath: productData.imagePath,
    };
    
  
    try {
      const response = await axios.post(`${API_BASE_URL}/Products`, payload);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error creating product:', error.response?.data?.errors || error.message);
      throw error;
    }
  };
  