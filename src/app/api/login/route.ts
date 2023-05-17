import { signJwtAccessToken } from "@/lib/jwt";
import {pool} from "@/lib/db";


interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

//  const user = await prisma.user.findFirst({
 //   where: {
 //     email: body.username,
 //   },
//  });

try {
  interface Users {
    id: number;
    name: string;
    email: string;
  }
  let user: Users[] = await pool.query("select * from User where email ='" + body.username + "' and password =sha1('" + body.password + "') LIMIT 1");
 
  console.log(user[0].email);

  if (!user) {
   // const { password, ...userWithoutPass } = user;
  
    return new Response(JSON.stringify(null));
  } else {

    const userPlainObject = {
      name: "test Name",
      email: "test emil",
      roll: "adminroll",
      // other relevant properties
    };
      const accessToken = signJwtAccessToken(userPlainObject);
      const result = {
        ...userPlainObject,
        accessToken,
      };
      console.log(result.roll + " result")
      return new Response(JSON.stringify(result));
  } 
} catch (error) {
  console.log(error + " -- error")
}
}
