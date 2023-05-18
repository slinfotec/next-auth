import { verifyJwt } from "@/lib/jwt";

import {pool} from "@/lib/db";

export async function GET(request: Request) {
  
  const accessToken = request.headers.get("authorization");
  if (!accessToken || !verifyJwt(accessToken)) {


    return new Response(
      JSON.stringify({
        error: "unauthorized",
      }),
      {
        status: 401,
      }
    );

    
  }
 // const userPosts = await prisma.post.findMany({
 //   where: { authorId: +params.id },
 //   include: {
  //    author: {
  //      select: {
  //        email: true,
  //        name: true,
  //      },
  //    },
 //   },
 // });
 const userPosts = await pool.query('select * from User');

  return new Response(JSON.stringify(userPosts));
}
