const API_BASE_URL = typeof window !== 'undefined' 
  ? (window as any).location?.origin?.includes('localhost') 
    ? 'http://127.0.0.1:8000/api' 
    : 'http://127.0.0.1:8000/api'
  : 'http://127.0.0.1:8000/api';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  user?: any;
  token?: string;
  [key: string]: any;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // Auth methods
  async login(email: string, password: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    return this.handleResponse(response);
  }

  async register(userData: {
    full_name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    address?: string;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    return this.handleResponse(response);
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getCurrentUser(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Product methods
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    category_id?: number;
    make_id?: number;
    featured?: boolean;
    in_stock?: boolean;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getProduct(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getFeaturedProducts(limit?: number): Promise<ApiResponse> {
    const queryParams = limit ? `?limit=${limit}` : '';
    const response = await fetch(`${API_BASE_URL}/products/featured${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getProductsByCategory(categoryId: string, params?: { page?: number; per_page?: number }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getProductsByMake(makeId: string, params?: { page?: number; per_page?: number }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/products/make/${makeId}?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Category methods
  async getCategories(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return this.handleResponse(response);
  }

  async getCategory(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return this.handleResponse(response);
  }

  // Car Make methods
  async getCarMakes(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/car-makes`);
    return this.handleResponse(response);
  }

  async getCarMake(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/car-makes/${id}`);
    return this.handleResponse(response);
  }

  // Like methods
  async toggleProductLike(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/like`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getProductLikeStatus(productId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/like-status`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getUserLikes(params?: { page?: number; per_page?: number }): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/user/likes?${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Order methods
  async getOrders(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async createOrder(orderData: {
    shipping_address: string;
    phone: string;
    cart: Array<{ id: number; quantity: number }>;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(orderData),
    });
    
    return this.handleResponse(response);
  }

  async getOrder(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  // Analytics methods
  async logEvent(eventData: {
    event_type: string;
    metadata?: Record<string, any>;
    session_id?: string;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/analytics/event`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    
    return this.handleResponse(response);
  }

  // Admin analytics methods
  async getAnalyticsDashboard(dateRange?: number): Promise<ApiResponse> {
    const queryParams = dateRange ? `?date_range=${dateRange}` : '';
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }

  async getUserBehaviorPatterns(dateRange?: number): Promise<ApiResponse> {
    const queryParams = dateRange ? `?date_range=${dateRange}` : '';
    const response = await fetch(`${API_BASE_URL}/analytics/behavior${queryParams}`, {
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
