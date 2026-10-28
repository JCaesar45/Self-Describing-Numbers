def is_self_describing(n):
    s = str(n)
    return all(int(s[i]) == s.count(str(i)) for i in range(len(s)))
