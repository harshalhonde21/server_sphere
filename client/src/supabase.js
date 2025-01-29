import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycahzvfkfnxnnwgzxxnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljYWh6dmZrZm54bm53Z3p4eG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODU2MTcsImV4cCI6MjA0ODU2MTYxN30.v8W1YjQvPDz7QRpNEmKCp_KTtVlSpF1fQ51BSE-AdmY'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase