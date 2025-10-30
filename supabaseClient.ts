import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvhqaczentnykbeybmup.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aHFhY3plbnRueWtiZXlibXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODQyMzgsImV4cCI6MjA3NzE2MDIzOH0.1O8n209dbh2ynKYctN9ZGCycz3zJhrt1lIxFN7-ibkA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
