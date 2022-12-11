// 接口类型的泛型

interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}

interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}

function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return new Promise(res => {
    res({
      code: 200,
      data: {
        name: 'foo',
        homepage: '/',
        avatar: 'https://image.cdn/1.jpg'
      }
    })
  })
}


// 嵌套泛型
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}


type returnType = Promise<IRes<IPaginationRes<IUserProfileRes>>>