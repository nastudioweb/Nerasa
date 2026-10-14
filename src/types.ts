export type MenuCategory =
  | 'all'
  | 'starter'
  | 'meals'
  | 'pasta'
  | 'rice-bowl'
  | 'main-course'
  | 'soup-dessert'
  | 'new'
  | 'classic-coffee'
  | 'flavored-coffee'
  | 'mont-blanc'
  | 'non-coffee'
  | 'mocktails'
  | 'frappe'
  | 'tea-others';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image?: string;
  badge?: 'SIGNATURE' | 'BEST SELLER' | 'NEW' | 'CHEF CHOICE';
  tags?: string[];
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export type SeatingAreaType = 'indoor' | 'outdoor' | 'meeting' | 'sofa' | 'bar';

export interface SeatingArea {
  id: SeatingAreaType;
  name: string;
  description: string;
  capacity: string;
  features: string[];
  recommendedFor: string;
  icon: string;
}

export interface Reservation {
  id: string;
  code: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  area: SeatingAreaType;
  specialRequests: string[];
  customNotes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  rating: number;
  date: string;
  comment: string;
  orderType?: string;
  priceRange?: string;
  ratingsBreakdown?: {
    food: number;
    service: number;
    ambience: number;
  };
  tags: string[];
  photos?: string[];
  ownerReply?: {
    date: string;
    text: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'interior' | 'exterior' | 'food' | 'facilities';
  image: string;
  caption: string;
}
