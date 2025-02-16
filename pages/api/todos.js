import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default async function handler(req, res) {
  const { user } = await supabase.auth.getUser()
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  switch (req.method) {
    case 'GET':
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true })
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json(data)
    // Implement POST, PUT, DELETE methods similarly
  }
}
