#include <iostream>
#include <vector>
#include <string>
using namespace std;

const int MOD = 1e9 + 7;

// Function to find all occurrences of T in S using KMP Algorithm
vector<int> findOccurrences(const string &S, const string &T) {
    int n = S.size(), m = T.size();
    vector<int> lps(m, 0), res;
    
    // Preprocess the pattern T for the KMP algorithm
    for (int i = 1, len = 0; i < m;) {
        if (T[i] == T[len]) {
            lps[i++] = ++len;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
    }
    
    // Perform the KMP search
    for (int i = 0, j = 0; i < n;) {
        if (S[i] == T[j]) {
            i++, j++;
        }
        if (j == m) {
            // Found occurrence of T in S
            res.push_back(i - j + 1); // 1-based index
            j = lps[j - 1];
        } else if (i < n && S[i] != T[j]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return res;
}

// Function to rotate the string S (cyclic shift)
string rotateString(const string &S) {
    return S.back() + S.substr(0, S.size() - 1);
}

// Main function to calculate the final answer
int countit(string S, string T) {
    int N = S.size();
    int answer = 0;
    
    // Perform N rotations
    for (int i = 0; i < N; ++i) {
        // Find all occurrences of T in the current version of S
        vector<int> occurrences = findOccurrences(S, T);
        
        // Add the starting indices of the substrings to the answer
        for (int index : occurrences) {
            answer = (answer + index) % MOD;
        }
        
        // Rotate the string S for the next round
        S = rotateString(S);
    }
    
    return answer;
}

int main() {
    int N, M;
    string S, T;
    
    // Read input
    cin >> N; // Length of S
    cin >> M; // Length of T
    cin >> S; // String S
    cin >> T; // String T
    
    // Calculate and print the result
    cout << countit(S, T) << endl;
    
    return 0;
}

