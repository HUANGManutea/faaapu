class FaaapuConfig {
  String supabaseUrl;
  String supabaseAnonKey;
  int nbDaysCache;

  FaaapuConfig({required this.supabaseAnonKey, required this.supabaseUrl, required this.nbDaysCache});
}