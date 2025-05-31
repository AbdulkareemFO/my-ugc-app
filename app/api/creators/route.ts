import { NextResponse } from 'next/server'
import { getAllCreators } from '../../actions/get-all-creators'

export async function GET() {
  const creators = await getAllCreators()
  return NextResponse.json(creators)
}