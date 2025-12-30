import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yiutnfhlvilbcjtuluhy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdXRuZmhsdmlsYmNqdHVsdWh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNTI4MDcsImV4cCI6MjA4MjYyODgwN30.zPLItbv_sl-jVz_jUvGe3D5VQTaeji6YNjSj2wgtnKw'

export const supabase = createClient(supabaseUrl, supabaseKey)
