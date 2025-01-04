export interface InstagramMediaChild {
  id: string;
  media_type: 'IMAGE' | 'VIDEO';
  media_url: string;
  thumbnail_url?: string;
}

export interface InstagramMedia {
  id: string;
  caption: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username: string;
  like_count: number;
  comments_count: number;
  children?: {
    data: InstagramMediaChild[];
  };
}

export interface InstagramFeed {
  data: InstagramMedia[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
} 