import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fzkayxrywwymclmyenqf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6a2F5eHJ5d3d5bWNsbXllbnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxOTQ2ODksImV4cCI6MjAxOTc3MDY4OX0.pgWV1k605c1WkWD_whTwYLUyJyI2HaxYV22v9ID8CoA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
