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

  export const createProduct = async ({
    name,
    categoryId,
    price,
    barcode,
    quantity,
    status,
    supplierId,
    inventoryId,
    unitMeasurement,
    description,
    imagePath,
  }: CreateProductPayload) => {
    const payload = {
      p_name: name,
      p_category_id: categoryId,
      p_price: price,
      p_barcode: barcode,
      p_quantity: quantity,
      p_status: status,
      p_supplier_id: supplierId,
      p_inventory_id: inventoryId,
      p_unit_measurement: unitMeasurement,
      p_description: description,
      p_image_path: imagePath,
    };
  
    try {
      const response = await axios.post(API_BASE_URL, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('❌ Error creating product:', error.response?.data || error.message);
      } else {
        console.error('❌ Error creating product:', error);
      }
      throw error;
    }
  };
  