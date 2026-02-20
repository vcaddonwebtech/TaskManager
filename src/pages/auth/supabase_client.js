import {createClient} from "@supabase/supabase-js"
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log("URL",url)
export const supabase = createClient(url,key)