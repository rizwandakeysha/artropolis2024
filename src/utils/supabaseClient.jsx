// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://upjclktfbvgfsawaznpj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwamNsa3RmYnZnZnNhd2F6bnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzM3NjEsImV4cCI6MjA0Njc0OTc2MX0.BIsliirej46KFlJ1Z9e8YCib2yiVjKkzltsj52j7kO8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
