import { createBrowserClient } from '@supabase/ssr'
import { SUPABASE_KEY, SUPABASE_URL } from '../../utils/variables'

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY)