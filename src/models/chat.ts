export interface IChat {
  title: string;
  imageUrl: string;
  creator: {
    nickname: string;
    phone: string;
    id: string;
  };
  id: string;
  users: [
    {
      nickname: string;
      phone: string;
      id: string;
    }
  ];
  messages: [
    {
      message: string;
      creator: {
        nickname: string;
        phone?: string;
        id: string;
      };
      id: string;
      date: string;
    }
  ];
}
