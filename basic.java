public static boolean isSelfDescribing(int n) {
    String s = String.valueOf(n);
    for (int i = 0; i < s.length(); i++) {
        int count = 0;
        for (int j = 0; j < s.length(); j++) {
            if (s.charAt(j) - '0' == i) count++;
        }
        if (s.charAt(i) - '0' != count) return false;
    }
    return true;
}
