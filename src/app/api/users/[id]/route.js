import { NextResponse } from "next/server";
import prisma from '../../../../../prisma/client'

export async function GET(req, { params }) {
   const id = parseInt(params.id)
   const user = await prisma.user.findUnique({
      where: { id }
   })

   if (!user) {
      return NextResponse.json(
         {
            message: 'User Not Found!',
            data: null
         },
         {
            status: 404
         }
      )
   }

   
}
