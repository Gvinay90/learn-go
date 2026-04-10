// @ts-nocheck
"use client";

import React from "react";
const { useState, useCallback, useMemo, useEffect } = React;

const dsaSection = {
  id: "dsa",
  title: "Data Structures in Go",
  icon: "\u{1F333}",
  content: {
    intro: "Go does not have a built-in collections framework like Java or C++. Instead, you build data structures from slices, maps, pointers, and structs. This section covers idiomatic Go implementations of all major data structures used in coding interviews and real-world systems.",
    subsections: [
      {
        title: "Array & Slice Fundamentals",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\n// Arrays: fixed size, value type\nfunc arrayDemo() {\n    var arr [5]int = [5]int{1, 2, 3, 4, 5}\n    fmt.Println(arr)\n}\n\n// Slices: dynamic, reference type\nfunc sliceDemo() {\n    nums := []int{10, 20, 30, 40, 50}\n    nums = append(nums, 60)\n    fmt.Println(nums)\n    fmt.Println(nums[1:3]) // [20 30]\n}\n\n// Two-pointer technique (sorted array)\nfunc twoSum(nums []int, target int) (int, int) {\n    left, right := 0, len(nums)-1\n    for left < right {\n        sum := nums[left] + nums[right]\n        if sum == target {\n            return left, right\n        } else if sum < target {\n            left++\n        } else {\n            right--\n        }\n    }\n    return -1, -1\n}\n\n// Sliding Window: max sum of subarray of size k\nfunc maxSumSubarray(nums []int, k int) int {\n    if len(nums) < k {\n        return 0\n    }\n    windowSum := 0\n    for i := 0; i < k; i++ {\n        windowSum += nums[i]\n    }\n    maxSum := windowSum\n    for i := k; i < len(nums); i++ {\n        windowSum += nums[i] - nums[i-k]\n        if windowSum > maxSum {\n            maxSum = windowSum\n        }\n    }\n    return maxSum\n}\n\n// Binary Search\nfunc binarySearch(nums []int, target int) int {\n    lo, hi := 0, len(nums)-1\n    for lo <= hi {\n        mid := lo + (hi-lo)/2\n        if nums[mid] == target {\n            return mid\n        } else if nums[mid] < target {\n            lo = mid + 1\n        } else {\n            hi = mid - 1\n        }\n    }\n    return -1\n}\n\nfunc main() {\n    arrayDemo()\n    sliceDemo()\n\n    sorted := []int{1, 3, 5, 7, 9, 11}\n    fmt.Println(twoSum(sorted, 12))      // 2, 3\n    fmt.Println(binarySearch(sorted, 7)) // 3\n\n    nums := []int{2, 1, 5, 1, 3, 2}\n    fmt.Println(maxSumSubarray(nums, 3)) // 9\n}",
        notes: [
          "Slices are the Go equivalent of ArrayList (Java) or vector (C++).",
          "Always use lo + (hi-lo)/2 instead of (lo+hi)/2 to avoid overflow.",
          "sort.Ints(s), sort.Strings(s) for in-place sorting. Go 1.21+: slices.Sort(s)."
        ]
      },
      {
        title: "String Manipulation",
        lang: "go",
        code: "package main\n\nimport (\n    \"fmt\"\n    \"strings\"\n    \"unicode\"\n)\n\n// Reverse a string (rune-safe for Unicode)\nfunc reverseString(s string) string {\n    runes := []rune(s)\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}\n\n// Check palindrome (ignoring non-letters)\nfunc isPalindrome(s string) bool {\n    s = strings.ToLower(s)\n    runes := []rune{}\n    for _, ch := range s {\n        if unicode.IsLetter(ch) || unicode.IsDigit(ch) {\n            runes = append(runes, ch)\n        }\n    }\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        if runes[i] != runes[j] {\n            return false\n        }\n    }\n    return true\n}\n\n// Character frequency map\nfunc charFrequency(s string) map[rune]int {\n    freq := make(map[rune]int)\n    for _, ch := range s {\n        freq[ch]++\n    }\n    return freq\n}\n\n// Efficient string building\nfunc buildString(words []string) string {\n    var sb strings.Builder\n    for i, w := range words {\n        if i > 0 {\n            sb.WriteString(\" \")\n        }\n        sb.WriteString(w)\n    }\n    return sb.String()\n}\n\nfunc main() {\n    fmt.Println(reverseString(\"Hello, World!\"))\n    fmt.Println(isPalindrome(\"A man, a plan, a canal: Panama\"))\n    fmt.Println(charFrequency(\"hello\"))\n    fmt.Println(buildString([]string{\"Go\", \"is\", \"awesome\"}))\n}",
        notes: [
          "Strings are immutable in Go. Convert to []byte or []rune for modification.",
          "Use strings.Builder for efficient concatenation (like StringBuilder in Java).",
          "range over string gives (index, rune), not bytes. Safe for Unicode.",
          "C++ equivalent: std::string. Python equivalent: str (also immutable)."
        ]
      },
      {
        title: "HashMap & HashSet",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\n// HashSet using map[T]struct{} (zero memory per value)\ntype Set struct {\n    data map[string]struct{}\n}\n\nfunc NewSet() *Set {\n    return &Set{data: make(map[string]struct{})}\n}\n\nfunc (s *Set) Add(val string)    { s.data[val] = struct{}{} }\nfunc (s *Set) Remove(val string) { delete(s.data, val) }\nfunc (s *Set) Contains(val string) bool {\n    _, ok := s.data[val]\n    return ok\n}\nfunc (s *Set) Size() int { return len(s.data) }\n\n// Two Sum using HashMap\nfunc twoSumMap(nums []int, target int) [2]int {\n    seen := make(map[int]int)\n    for i, n := range nums {\n        complement := target - n\n        if j, ok := seen[complement]; ok {\n            return [2]int{j, i}\n        }\n        seen[n] = i\n    }\n    return [2]int{-1, -1}\n}\n\n// Group Anagrams\nfunc groupAnagrams(strs []string) [][]string {\n    groups := make(map[[26]byte][]string)\n    for _, s := range strs {\n        var key [26]byte\n        for _, c := range s {\n            key[c-'a']++\n        }\n        groups[key] = append(groups[key], s)\n    }\n    result := make([][]string, 0, len(groups))\n    for _, group := range groups {\n        result = append(result, group)\n    }\n    return result\n}\n\nfunc main() {\n    s := NewSet()\n    s.Add(\"apple\")\n    s.Add(\"banana\")\n    fmt.Println(s.Contains(\"apple\"))  // true\n    fmt.Println(s.Contains(\"cherry\")) // false\n\n    nums := []int{2, 7, 11, 15}\n    fmt.Println(twoSumMap(nums, 9)) // [0, 1]\n\n    words := []string{\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"}\n    fmt.Println(groupAnagrams(words))\n}",
        notes: [
          "Go has no built-in Set. Use map[T]struct{} for zero-cost sets.",
          "map[T]struct{} is preferred over map[T]bool because struct{} uses 0 bytes.",
          "Maps are unordered. For ordered maps, use a slice of keys + sort.",
          "Java: HashMap/HashSet. Python: dict/set. C++: unordered_map/unordered_set."
        ]
      },
      {
        title: "Stack & Queue",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\n// ===== STACK (LIFO) =====\ntype Stack struct {\n    items []interface{}\n}\n\nfunc (s *Stack) Push(val interface{}) {\n    s.items = append(s.items, val)\n}\n\nfunc (s *Stack) Pop() (interface{}, bool) {\n    if len(s.items) == 0 {\n        return nil, false\n    }\n    top := s.items[len(s.items)-1]\n    s.items = s.items[:len(s.items)-1]\n    return top, true\n}\n\nfunc (s *Stack) Peek() (interface{}, bool) {\n    if len(s.items) == 0 {\n        return nil, false\n    }\n    return s.items[len(s.items)-1], true\n}\n\nfunc (s *Stack) IsEmpty() bool { return len(s.items) == 0 }\n\n// Valid Parentheses using Stack\nfunc isValid(s string) bool {\n    stack := &Stack{}\n    pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}\n    for _, ch := range s {\n        if ch == '(' || ch == '[' || ch == '{' {\n            stack.Push(ch)\n        } else {\n            top, ok := stack.Pop()\n            if !ok || top.(rune) != pairs[ch] {\n                return false\n            }\n        }\n    }\n    return stack.IsEmpty()\n}\n\n// ===== QUEUE (FIFO) =====\ntype Queue struct {\n    items []interface{}\n}\n\nfunc (q *Queue) Enqueue(val interface{}) {\n    q.items = append(q.items, val)\n}\n\nfunc (q *Queue) Dequeue() (interface{}, bool) {\n    if len(q.items) == 0 {\n        return nil, false\n    }\n    front := q.items[0]\n    q.items = q.items[1:]\n    return front, true\n}\n\nfunc (q *Queue) IsEmpty() bool { return len(q.items) == 0 }\nfunc (q *Queue) Size() int     { return len(q.items) }\n\nfunc main() {\n    fmt.Println(isValid(\"({[]})\"))  // true\n    fmt.Println(isValid(\"({[}])\"))  // false\n\n    q := &Queue{}\n    q.Enqueue(\"first\")\n    q.Enqueue(\"second\")\n    q.Enqueue(\"third\")\n    val, _ := q.Dequeue()\n    fmt.Println(val) // first\n}",
        notes: [
          "Slice-based stack is simple and efficient. Pop from the end is O(1).",
          "Slice-based queue: Dequeue from front is O(n). For production, use container/list or ring buffer.",
          "Go channels are natural concurrent queues.",
          "container/heap in the stdlib implements a priority queue interface."
        ]
      },
      {
        title: "Singly Linked List",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype ListNode struct {\n    Val  int\n    Next *ListNode\n}\n\ntype SinglyLinkedList struct {\n    Head *ListNode\n    Size int\n}\n\nfunc (ll *SinglyLinkedList) InsertHead(val int) {\n    ll.Head = &ListNode{Val: val, Next: ll.Head}\n    ll.Size++\n}\n\nfunc (ll *SinglyLinkedList) InsertTail(val int) {\n    node := &ListNode{Val: val}\n    if ll.Head == nil {\n        ll.Head = node\n    } else {\n        curr := ll.Head\n        for curr.Next != nil {\n            curr = curr.Next\n        }\n        curr.Next = node\n    }\n    ll.Size++\n}\n\nfunc (ll *SinglyLinkedList) Delete(val int) bool {\n    if ll.Head == nil {\n        return false\n    }\n    if ll.Head.Val == val {\n        ll.Head = ll.Head.Next\n        ll.Size--\n        return true\n    }\n    curr := ll.Head\n    for curr.Next != nil {\n        if curr.Next.Val == val {\n            curr.Next = curr.Next.Next\n            ll.Size--\n            return true\n        }\n        curr = curr.Next\n    }\n    return false\n}\n\nfunc (ll *SinglyLinkedList) Reverse() {\n    var prev *ListNode\n    curr := ll.Head\n    for curr != nil {\n        next := curr.Next\n        curr.Next = prev\n        prev = curr\n        curr = next\n    }\n    ll.Head = prev\n}\n\nfunc hasCycle(head *ListNode) bool {\n    slow, fast := head, head\n    for fast != nil && fast.Next != nil {\n        slow = slow.Next\n        fast = fast.Next.Next\n        if slow == fast {\n            return true\n        }\n    }\n    return false\n}\n\nfunc findMiddle(head *ListNode) *ListNode {\n    slow, fast := head, head\n    for fast != nil && fast.Next != nil {\n        slow = slow.Next\n        fast = fast.Next.Next\n    }\n    return slow\n}\n\nfunc (ll *SinglyLinkedList) Print() {\n    for curr := ll.Head; curr != nil; curr = curr.Next {\n        fmt.Printf(\"%d -> \", curr.Val)\n    }\n    fmt.Println(\"nil\")\n}\n\nfunc main() {\n    ll := &SinglyLinkedList{}\n    ll.InsertTail(1)\n    ll.InsertTail(2)\n    ll.InsertTail(3)\n    ll.InsertHead(0)\n    ll.Print()\n\n    ll.Reverse()\n    ll.Print()\n\n    ll.Delete(2)\n    ll.Print()\n\n    mid := findMiddle(ll.Head)\n    fmt.Println(\"Middle:\", mid.Val)\n}",
        notes: [
          "Go uses pointers (*ListNode) for linked list nodes, similar to C/C++.",
          "No malloc/free. Go's garbage collector handles memory.",
          "The stdlib container/list provides a doubly linked list.",
          "Floyd's slow/fast pointer is a classic interview pattern."
        ]
      },
      {
        title: "Doubly Linked List & LRU",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype DLLNode struct {\n    Key, Val   int\n    Prev, Next *DLLNode\n}\n\ntype DoublyLinkedList struct {\n    Head, Tail *DLLNode\n    Size       int\n}\n\nfunc NewDLL() *DoublyLinkedList {\n    head := &DLLNode{}\n    tail := &DLLNode{}\n    head.Next = tail\n    tail.Prev = head\n    return &DoublyLinkedList{Head: head, Tail: tail}\n}\n\nfunc (dll *DoublyLinkedList) AddFront(node *DLLNode) {\n    node.Next = dll.Head.Next\n    node.Prev = dll.Head\n    dll.Head.Next.Prev = node\n    dll.Head.Next = node\n    dll.Size++\n}\n\nfunc (dll *DoublyLinkedList) Remove(node *DLLNode) {\n    node.Prev.Next = node.Next\n    node.Next.Prev = node.Prev\n    dll.Size--\n}\n\nfunc (dll *DoublyLinkedList) RemoveLast() *DLLNode {\n    if dll.Size == 0 {\n        return nil\n    }\n    last := dll.Tail.Prev\n    dll.Remove(last)\n    return last\n}\n\nfunc (dll *DoublyLinkedList) Print() {\n    curr := dll.Head.Next\n    for curr != dll.Tail {\n        fmt.Printf(\"%d <-> \", curr.Val)\n        curr = curr.Next\n    }\n    fmt.Println(\"nil\")\n}\n\n// ===== LRU Cache (LeetCode #146) =====\ntype LRUCache struct {\n    capacity int\n    cache    map[int]*DLLNode\n    dll      *DoublyLinkedList\n}\n\nfunc NewLRUCache(cap int) *LRUCache {\n    return &LRUCache{\n        capacity: cap,\n        cache:    make(map[int]*DLLNode),\n        dll:      NewDLL(),\n    }\n}\n\nfunc (lru *LRUCache) Get(key int) int {\n    if node, ok := lru.cache[key]; ok {\n        lru.dll.Remove(node)\n        lru.dll.AddFront(node)\n        return node.Val\n    }\n    return -1\n}\n\nfunc (lru *LRUCache) Put(key, value int) {\n    if node, ok := lru.cache[key]; ok {\n        node.Val = value\n        lru.dll.Remove(node)\n        lru.dll.AddFront(node)\n        return\n    }\n    if lru.dll.Size >= lru.capacity {\n        last := lru.dll.RemoveLast()\n        delete(lru.cache, last.Key)\n    }\n    node := &DLLNode{Key: key, Val: value}\n    lru.dll.AddFront(node)\n    lru.cache[key] = node\n}\n\nfunc main() {\n    dll := NewDLL()\n    dll.AddFront(&DLLNode{Val: 3})\n    dll.AddFront(&DLLNode{Val: 2})\n    dll.AddFront(&DLLNode{Val: 1})\n    dll.Print()\n\n    lru := NewLRUCache(2)\n    lru.Put(1, 10)\n    lru.Put(2, 20)\n    fmt.Println(lru.Get(1)) // 10\n    lru.Put(3, 30)          // evicts key 2\n    fmt.Println(lru.Get(2)) // -1\n    fmt.Println(lru.Get(3)) // 30\n}",
        notes: [
          "Sentinel (dummy) head/tail eliminate nil checks in insert/delete.",
          "DLL + HashMap = LRU Cache (LeetCode #146).",
          "Go's stdlib container/list is a production-ready DLL.",
          "O(1) insert, delete, and move make DLL ideal for caches."
        ]
      },
      {
        title: "Binary Tree & BST",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype TreeNode struct {\n    Val         int\n    Left, Right *TreeNode\n}\n\nfunc inorder(root *TreeNode, result *[]int) {\n    if root == nil {\n        return\n    }\n    inorder(root.Left, result)\n    *result = append(*result, root.Val)\n    inorder(root.Right, result)\n}\n\nfunc levelOrder(root *TreeNode) [][]int {\n    if root == nil {\n        return nil\n    }\n    var result [][]int\n    queue := []*TreeNode{root}\n    for len(queue) > 0 {\n        size := len(queue)\n        level := make([]int, 0, size)\n        for i := 0; i < size; i++ {\n            node := queue[0]\n            queue = queue[1:]\n            level = append(level, node.Val)\n            if node.Left != nil {\n                queue = append(queue, node.Left)\n            }\n            if node.Right != nil {\n                queue = append(queue, node.Right)\n            }\n        }\n        result = append(result, level)\n    }\n    return result\n}\n\nfunc bstInsert(root *TreeNode, val int) *TreeNode {\n    if root == nil {\n        return &TreeNode{Val: val}\n    }\n    if val < root.Val {\n        root.Left = bstInsert(root.Left, val)\n    } else {\n        root.Right = bstInsert(root.Right, val)\n    }\n    return root\n}\n\nfunc maxDepth(root *TreeNode) int {\n    if root == nil {\n        return 0\n    }\n    left := maxDepth(root.Left)\n    right := maxDepth(root.Right)\n    if left > right {\n        return left + 1\n    }\n    return right + 1\n}\n\nfunc main() {\n    var root *TreeNode\n    for _, v := range []int{5, 3, 7, 1, 4, 6, 8} {\n        root = bstInsert(root, v)\n    }\n\n    var result []int\n    inorder(root, &result)\n    fmt.Println(\"Inorder:\", result)\n    fmt.Println(\"Levels:\", levelOrder(root))\n    fmt.Println(\"Depth:\", maxDepth(root))\n}",
        notes: [
          "Tree problems are mostly solved with recursion or BFS queues.",
          "Inorder traversal of BST always gives sorted output.",
          "Go has no built-in tree. C++ has std::set/map (red-black), Java has TreeMap."
        ]
      },
      {
        title: "Heap / Priority Queue",
        lang: "go",
        code: "package main\n\nimport (\n    \"container/heap\"\n    \"fmt\"\n)\n\ntype MinHeap []int\n\nfunc (h MinHeap) Len() int           { return len(h) }\nfunc (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }\nfunc (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }\nfunc (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }\nfunc (h *MinHeap) Pop() interface{} {\n    old := *h\n    n := len(old)\n    x := old[n-1]\n    *h = old[:n-1]\n    return x\n}\n\ntype Item struct {\n    Val   int\n    Count int\n}\ntype ItemHeap []Item\n\nfunc (h ItemHeap) Len() int           { return len(h) }\nfunc (h ItemHeap) Less(i, j int) bool { return h[i].Count > h[j].Count }\nfunc (h ItemHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }\nfunc (h *ItemHeap) Push(x interface{}) { *h = append(*h, x.(Item)) }\nfunc (h *ItemHeap) Pop() interface{} {\n    old := *h\n    n := len(old)\n    x := old[n-1]\n    *h = old[:n-1]\n    return x\n}\n\nfunc topKFrequent(nums []int, k int) []int {\n    freq := make(map[int]int)\n    for _, n := range nums {\n        freq[n]++\n    }\n    h := &ItemHeap{}\n    for val, count := range freq {\n        heap.Push(h, Item{val, count})\n    }\n    result := make([]int, k)\n    for i := 0; i < k; i++ {\n        result[i] = heap.Pop(h).(Item).Val\n    }\n    return result\n}\n\nfunc main() {\n    h := &MinHeap{5, 3, 8, 1, 9}\n    heap.Init(h)\n    heap.Push(h, 2)\n    fmt.Println(\"Min:\", heap.Pop(h)) // 1\n\n    nums := []int{1, 1, 1, 2, 2, 3}\n    fmt.Println(\"Top 2:\", topKFrequent(nums, 2))\n}",
        notes: [
          "container/heap requires 5 methods: Len, Less, Swap, Push, Pop.",
          "For Max-Heap, reverse Less(). Everything else stays the same.",
          "Java: PriorityQueue. C++: priority_queue. Python: heapq."
        ]
      },
      {
        title: "Trie (Prefix Tree)",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype TrieNode struct {\n    Children [26]*TrieNode\n    IsEnd    bool\n}\n\ntype Trie struct {\n    Root *TrieNode\n}\n\nfunc NewTrie() *Trie {\n    return &Trie{Root: &TrieNode{}}\n}\n\nfunc (t *Trie) Insert(word string) {\n    node := t.Root\n    for _, ch := range word {\n        idx := ch - 'a'\n        if node.Children[idx] == nil {\n            node.Children[idx] = &TrieNode{}\n        }\n        node = node.Children[idx]\n    }\n    node.IsEnd = true\n}\n\nfunc (t *Trie) Search(word string) bool {\n    node := t.find(word)\n    return node != nil && node.IsEnd\n}\n\nfunc (t *Trie) StartsWith(prefix string) bool {\n    return t.find(prefix) != nil\n}\n\nfunc (t *Trie) find(s string) *TrieNode {\n    node := t.Root\n    for _, ch := range s {\n        idx := ch - 'a'\n        if node.Children[idx] == nil {\n            return nil\n        }\n        node = node.Children[idx]\n    }\n    return node\n}\n\nfunc (t *Trie) Autocomplete(prefix string) []string {\n    node := t.find(prefix)\n    if node == nil {\n        return nil\n    }\n    var results []string\n    var dfs func(n *TrieNode, path string)\n    dfs = func(n *TrieNode, path string) {\n        if n.IsEnd {\n            results = append(results, path)\n        }\n        for i, child := range n.Children {\n            if child != nil {\n                dfs(child, path+string(rune('a'+i)))\n            }\n        }\n    }\n    dfs(node, prefix)\n    return results\n}\n\nfunc main() {\n    trie := NewTrie()\n    for _, w := range []string{\"apple\", \"app\", \"apricot\", \"banana\", \"band\"} {\n        trie.Insert(w)\n    }\n    fmt.Println(trie.Search(\"app\"))       // true\n    fmt.Println(trie.StartsWith(\"ap\"))    // true\n    fmt.Println(trie.Autocomplete(\"ap\"))  // [app apple apricot]\n    fmt.Println(trie.Autocomplete(\"ban\")) // [banana band]\n}",
        notes: [
          "Tries provide O(m) search where m is key length.",
          "For Unicode, use map[rune]*TrieNode instead of [26]*TrieNode.",
          "Used in: autocomplete, spell checkers, IP routing."
        ]
      },
      {
        title: "Graph (BFS / DFS)",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype Graph struct {\n    AdjList  map[int][]int\n    Directed bool\n}\n\nfunc NewGraph(directed bool) *Graph {\n    return &Graph{AdjList: make(map[int][]int), Directed: directed}\n}\n\nfunc (g *Graph) AddEdge(from, to int) {\n    g.AdjList[from] = append(g.AdjList[from], to)\n    if !g.Directed {\n        g.AdjList[to] = append(g.AdjList[to], from)\n    }\n}\n\nfunc (g *Graph) BFS(start int) []int {\n    visited := map[int]bool{start: true}\n    queue := []int{start}\n    var order []int\n    for len(queue) > 0 {\n        node := queue[0]\n        queue = queue[1:]\n        order = append(order, node)\n        for _, nb := range g.AdjList[node] {\n            if !visited[nb] {\n                visited[nb] = true\n                queue = append(queue, nb)\n            }\n        }\n    }\n    return order\n}\n\nfunc (g *Graph) DFS(start int) []int {\n    visited := make(map[int]bool)\n    var order []int\n    var dfs func(int)\n    dfs = func(node int) {\n        visited[node] = true\n        order = append(order, node)\n        for _, nb := range g.AdjList[node] {\n            if !visited[nb] {\n                dfs(nb)\n            }\n        }\n    }\n    dfs(start)\n    return order\n}\n\nfunc (g *Graph) TopologicalSort() []int {\n    inDeg := make(map[int]int)\n    for n := range g.AdjList {\n        if _, ok := inDeg[n]; !ok {\n            inDeg[n] = 0\n        }\n        for _, nb := range g.AdjList[n] {\n            inDeg[nb]++\n        }\n    }\n    var queue, sorted []int\n    for n, d := range inDeg {\n        if d == 0 {\n            queue = append(queue, n)\n        }\n    }\n    for len(queue) > 0 {\n        n := queue[0]\n        queue = queue[1:]\n        sorted = append(sorted, n)\n        for _, nb := range g.AdjList[n] {\n            inDeg[nb]--\n            if inDeg[nb] == 0 {\n                queue = append(queue, nb)\n            }\n        }\n    }\n    return sorted\n}\n\nfunc main() {\n    g := NewGraph(false)\n    g.AddEdge(0, 1)\n    g.AddEdge(0, 2)\n    g.AddEdge(1, 3)\n    g.AddEdge(2, 3)\n    g.AddEdge(3, 4)\n    fmt.Println(\"BFS:\", g.BFS(0))\n    fmt.Println(\"DFS:\", g.DFS(0))\n\n    dag := NewGraph(true)\n    dag.AddEdge(5, 2)\n    dag.AddEdge(5, 0)\n    dag.AddEdge(4, 0)\n    dag.AddEdge(4, 1)\n    dag.AddEdge(2, 3)\n    dag.AddEdge(3, 1)\n    fmt.Println(\"Topo:\", dag.TopologicalSort())\n}",
        notes: [
          "Adjacency list: map[int][]int. Weighted: map[int][]Edge.",
          "BFS: shortest path in unweighted graphs.",
          "Topological sort only works on DAGs."
        ]
      },
      {
        title: "Union-Find",
        lang: "go",
        code: "package main\n\nimport \"fmt\"\n\ntype UnionFind struct {\n    parent []int\n    rank   []int\n    count  int\n}\n\nfunc NewUnionFind(n int) *UnionFind {\n    p := make([]int, n)\n    for i := range p {\n        p[i] = i\n    }\n    return &UnionFind{parent: p, rank: make([]int, n), count: n}\n}\n\nfunc (uf *UnionFind) Find(x int) int {\n    if uf.parent[x] != x {\n        uf.parent[x] = uf.Find(uf.parent[x])\n    }\n    return uf.parent[x]\n}\n\nfunc (uf *UnionFind) Union(x, y int) bool {\n    rx, ry := uf.Find(x), uf.Find(y)\n    if rx == ry {\n        return false\n    }\n    if uf.rank[rx] < uf.rank[ry] {\n        uf.parent[rx] = ry\n    } else if uf.rank[rx] > uf.rank[ry] {\n        uf.parent[ry] = rx\n    } else {\n        uf.parent[ry] = rx\n        uf.rank[rx]++\n    }\n    uf.count--\n    return true\n}\n\nfunc (uf *UnionFind) Connected(x, y int) bool {\n    return uf.Find(x) == uf.Find(y)\n}\n\nfunc main() {\n    uf := NewUnionFind(7)\n    uf.Union(0, 1)\n    uf.Union(1, 2)\n    uf.Union(3, 4)\n    uf.Union(5, 6)\n    fmt.Println(\"0-2 connected:\", uf.Connected(0, 2))\n    fmt.Println(\"0-3 connected:\", uf.Connected(0, 3))\n    fmt.Println(\"Components:\", uf.count)\n    uf.Union(2, 3)\n    fmt.Println(\"After union 2-3:\", uf.count)\n}",
        notes: [
          "Path compression + union by rank gives nearly O(1) per operation.",
          "Essential for: Kruskal's MST, connected components.",
          "No direct equivalent in most standard libraries."
        ]
      }
    ]
  }
};

const sections = [
  {
    id: "origins", title: "Origins & Philosophy", icon: "\u{1F331}",
    content: {
      intro: "Go (Golang) was created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It addresses slow compilation, complex dependency management, and difficulty writing concurrent programs.",
      principles: [
        { label: "Simplicity", desc: "Minimal syntax, no inheritance, no exceptions." },
        { label: "Concurrency", desc: "First-class goroutines and channels, inspired by CSP." },
        { label: "Fast Compilation", desc: "Compiles to native machine code in seconds." },
        { label: "Garbage Collected", desc: "Automatic memory management with low-latency GC." },
        { label: "Static Typing", desc: "Strong types with inference via :=." }
      ],
      comparison: { note: "Go borrows from multiple languages", items: [
        { from: "C", what: "Syntax structure, pointers (no arithmetic), compiled" },
        { from: "Python", what: "Simplicity, readable code, built-in slices/maps" },
        { from: "Java", what: "Implicit interfaces, GC, package system" },
        { from: "Erlang", what: "Concurrency via goroutines and channels" }
      ]}
    }
  },
  {
    id: "setup", title: "Setup & Hello World", icon: "\u{1F680}",
    content: {
      intro: "Every Go program starts with a package declaration. The main package with main() is the entry point.",
      code: [
        { title: "Hello World", lang: "go", code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}", notes: ["package main + func main() = executable.", "fmt is the standard formatting package.", "No semicolons needed."] },
        { title: "Running Go", lang: "bash", code: "# Run directly\ngo run main.go\n\n# Build executable\ngo build -o myapp main.go\n\n# Init module\ngo mod init github.com/user/project", notes: [] }
      ],
      comparison: { note: "No header files (vs C++), must declare package (vs Python), no class wrapping (vs Java).", items: [] }
    }
  },
  {
    id: "variables", title: "Variables & Types", icon: "\u{1F4E6}",
    content: {
      intro: "Go is statically typed with type inference. Variables can be declared explicitly or with :=.",
      code: [
        { title: "Variable Declarations", lang: "go", code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Explicit\n    var name string = \"Gopher\"\n    var age int = 10\n\n    // Type inference\n    var city = \"San Francisco\"\n\n    // Short declaration (most common)\n    country := \"USA\"\n    pi := 3.14159\n\n    // Multiple\n    var (\n        x int     = 1\n        y float64 = 2.5\n    )\n\n    // Constants\n    const MaxSize = 100\n\n    // Zero values\n    var i int     // 0\n    var b bool    // false\n    var s string  // \"\"\n\n    fmt.Println(name, age, city, country, pi)\n    fmt.Println(x, y, i, b, s, MaxSize)\n}", notes: [":= only inside functions.", "Unused variables = compile error.", "Every type has a zero value."] }
      ],
      comparison: { note: "", items: [
        { from: "C/C++", what: "int x = 5; vs Go: x := 5. Type after name in Go." },
        { from: "Python", what: "x = 5 vs x := 5. Similar, but Go is statically typed." },
        { from: "Java", what: "var x = 5 (Java 10+) vs x := 5." }
      ]}
    }
  },
  {
    id: "control", title: "Control Flow", icon: "\u{1F500}",
    content: {
      intro: "Only one loop keyword: for. If can include init statements. Switch doesn't fall through.",
      code: [
        { title: "If / Else / For / Switch", lang: "go", code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // If with init\n    x := 7\n    if x > 10 {\n        fmt.Println(\"big\")\n    } else if x > 5 {\n        fmt.Println(\"medium\")\n    } else {\n        fmt.Println(\"small\")\n    }\n\n    // For: the only loop\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n\n    // While-style\n    n := 0\n    for n < 3 {\n        n++\n    }\n\n    // Range\n    nums := []int{10, 20, 30}\n    for i, v := range nums {\n        fmt.Println(i, v)\n    }\n\n    // Switch (no fallthrough)\n    day := \"Tue\"\n    switch day {\n    case \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\":\n        fmt.Println(\"Weekday\")\n    default:\n        fmt.Println(\"Weekend\")\n    }\n\n    // Type switch\n    var val interface{} = 42\n    switch v := val.(type) {\n    case int:\n        fmt.Println(\"int:\", v)\n    case string:\n        fmt.Println(\"string:\", v)\n    }\n}", notes: ["No parentheses around conditions.", "No while. for does everything.", "Type switch is unique to Go."] }
      ],
      comparison: { note: "", items: [
        { from: "C/C++", what: "No parens. Switch reversed: no fallthrough by default." },
        { from: "Python", what: "for range ~ for x in collection." }
      ]}
    }
  },
  {
    id: "functions", title: "Functions & Methods", icon: "\u{2699}\u{FE0F}",
    content: {
      intro: "Multiple returns, named returns, variadic params, closures, and methods with receivers.",
      code: [
        { title: "Functions", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"math\"\n)\n\nfunc add(a, b int) int { return a + b }\n\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf(\"division by zero\")\n    }\n    return a / b, nil\n}\n\nfunc sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\n// Closure\nfunc counter() func() int {\n    count := 0\n    return func() int {\n        count++\n        return count\n    }\n}\n\n// Method with receiver\ntype Circle struct{ Radius float64 }\n\nfunc (c Circle) Area() float64 {\n    return math.Pi * c.Radius * c.Radius\n}\n\nfunc (c *Circle) Scale(f float64) {\n    c.Radius *= f\n}\n\nfunc main() {\n    fmt.Println(add(3, 5))\n    r, err := divide(10, 3)\n    fmt.Println(r, err)\n    fmt.Println(sum(1, 2, 3, 4, 5))\n\n    c := counter()\n    fmt.Println(c(), c(), c())\n\n    circle := Circle{Radius: 5}\n    fmt.Printf(\"Area: %.2f\\n\", circle.Area())\n    circle.Scale(2)\n    fmt.Printf(\"Scaled: %.2f\\n\", circle.Area())\n}", notes: ["(result, error) is the idiomatic return pattern.", "Pointer receiver (*T) to modify the struct.", "No classes. Methods + interfaces = Go's OOP."] }
      ],
      comparison: { note: "", items: [
        { from: "C", what: "Go adds multiple returns and closures." },
        { from: "Python", what: "Both: multiple returns, first-class functions." },
        { from: "C++", what: "Pointer vs value receivers ~ const vs non-const methods." }
      ]}
    }
  },
  {
    id: "structs", title: "Structs & Interfaces", icon: "\u{1F3D7}\u{FE0F}",
    content: {
      intro: "Structs define types. Interfaces define behavior, satisfied implicitly.",
      code: [
        { title: "Structs & Interfaces", lang: "go", code: "package main\n\nimport \"fmt\"\n\ntype User struct {\n    Name  string\n    Email string\n    Age   int\n}\n\n// Embedding (composition)\ntype Admin struct {\n    User\n    Perms []string\n}\n\n// Interface\ntype Shape interface {\n    Area() float64\n}\n\ntype Rect struct{ W, H float64 }\ntype Circle struct{ R float64 }\n\nfunc (r Rect) Area() float64   { return r.W * r.H }\nfunc (c Circle) Area() float64 { return 3.14159 * c.R * c.R }\n\nfunc printArea(s Shape) {\n    fmt.Printf(\"Area: %.2f\\n\", s.Area())\n}\n\nfunc main() {\n    admin := Admin{\n        User:  User{Name: \"Alice\", Email: \"a@b.com\", Age: 30},\n        Perms: []string{\"read\", \"write\"},\n    }\n    fmt.Println(admin.Name) // promoted\n\n    printArea(Rect{5, 3})\n    printArea(Circle{4})\n\n    // Empty interface\n    var any interface{} = \"hello\"\n    fmt.Println(any)\n}", notes: ["No 'implements' keyword. Implicit satisfaction.", "Embedding promotes fields (not inheritance).", "Small interfaces are idiomatic."] }
      ],
      comparison: { note: "", items: [
        { from: "Java", what: "Java needs 'implements'. Go is implicit." },
        { from: "Python", what: "Compile-time duck typing." },
        { from: "TypeScript", what: "Very similar structural typing." }
      ]}
    }
  },
  {
    id: "concurrency", title: "Goroutines & Channels", icon: "\u{26A1}",
    content: {
      intro: "Goroutines are lightweight threads. Channels are typed conduits for communication.",
      code: [
        { title: "Goroutines & WaitGroup", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    fmt.Printf(\"Worker %d starting\\n\", id)\n    time.Sleep(50 * time.Millisecond)\n    fmt.Printf(\"Worker %d done\\n\", id)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i := 1; i <= 5; i++ {\n        wg.Add(1)\n        go worker(i, &wg)\n    }\n    wg.Wait()\n    fmt.Println(\"All done\")\n}", notes: ["Goroutines cost ~2KB (vs ~1MB OS threads).", "Always pass loop vars to avoid closure bugs."] },
        { title: "Channels & Select", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"time\"\n)\n\nfunc producer(ch chan<- int) {\n    for i := 0; i < 5; i++ {\n        ch <- i\n    }\n    close(ch)\n}\n\nfunc main() {\n    // Basic\n    ch := make(chan string)\n    go func() { ch <- \"hello\" }()\n    fmt.Println(<-ch)\n\n    // Range over channel\n    numCh := make(chan int)\n    go producer(numCh)\n    for v := range numCh {\n        fmt.Println(\"Got:\", v)\n    }\n\n    // Select\n    c1 := make(chan string)\n    go func() {\n        time.Sleep(50 * time.Millisecond)\n        c1 <- \"result\"\n    }()\n    select {\n    case msg := <-c1:\n        fmt.Println(msg)\n    case <-time.After(time.Second):\n        fmt.Println(\"timeout\")\n    }\n}", notes: ["select is switch for channels.", "Close channels from the sender side.", "Buffered: make(chan int, 5)."] },
        { title: "Worker Pool", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc pool(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    for j := range jobs {\n        fmt.Printf(\"Worker %d: job %d\\n\", id, j)\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 10)\n    results := make(chan int, 10)\n    var wg sync.WaitGroup\n\n    for w := 1; w <= 3; w++ {\n        wg.Add(1)\n        go pool(w, jobs, results, &wg)\n    }\n    for j := 1; j <= 10; j++ {\n        jobs <- j\n    }\n    close(jobs)\n\n    go func() { wg.Wait(); close(results) }()\n    for r := range results {\n        fmt.Println(\"Result:\", r)\n    }\n}", notes: ["Fan-out: multiple goroutines read one channel.", "Fan-in: multiple goroutines write one channel."] }
      ],
      comparison: { note: "", items: [
        { from: "Java", what: "Goroutines are far lighter than Thread/ExecutorService." },
        { from: "Python", what: "No GIL. Truly concurrent." },
        { from: "Erlang", what: "Most similar: lightweight processes + message passing." }
      ]}
    }
  },
  {
    id: "mutex", title: "Mutex & Semaphore", icon: "\u{1F512}",
    content: {
      intro: "When goroutines share memory, use sync.Mutex for mutual exclusion, sync.RWMutex for read-heavy workloads, and buffered channels as semaphores.",
      code: [
        { title: "sync.Mutex", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\n// SafeCounter is safe for concurrent access\ntype SafeCounter struct {\n    mu sync.Mutex\n    v  map[string]int\n}\n\nfunc (c *SafeCounter) Inc(key string) {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    c.v[key]++\n}\n\nfunc (c *SafeCounter) Value(key string) int {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    return c.v[key]\n}\n\nfunc main() {\n    counter := SafeCounter{v: make(map[string]int)}\n    var wg sync.WaitGroup\n    for i := 0; i < 1000; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            counter.Inc(\"key\")\n        }()\n    }\n    wg.Wait()\n    fmt.Println(\"Final:\", counter.Value(\"key\")) // 1000\n}", notes: ["Always defer mu.Unlock() right after Lock().", "Mutex is NOT reentrant (locking twice = deadlock).", "Java: synchronized. C++: std::mutex."] },
        { title: "sync.RWMutex (Read-Write Lock)", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\n// Cache: many readers, exclusive writer\ntype Cache struct {\n    mu   sync.RWMutex\n    data map[string]string\n}\n\nfunc NewCache() *Cache {\n    return &Cache{data: make(map[string]string)}\n}\n\nfunc (c *Cache) Get(key string) (string, bool) {\n    c.mu.RLock()\n    defer c.mu.RUnlock()\n    val, ok := c.data[key]\n    return val, ok\n}\n\nfunc (c *Cache) Set(key, value string) {\n    c.mu.Lock()\n    defer c.mu.Unlock()\n    c.data[key] = value\n}\n\nfunc main() {\n    cache := NewCache()\n    cache.Set(\"hello\", \"world\")\n\n    var wg sync.WaitGroup\n    // 10 concurrent readers\n    for i := 0; i < 10; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            val, _ := cache.Get(\"hello\")\n            fmt.Printf(\"Reader %d: %s\\n\", id, val)\n        }(i)\n    }\n    wg.Wait()\n}", notes: ["RLock() allows multiple readers concurrently.", "Lock() is exclusive (blocks all readers and writers).", "Use when reads >> writes (caches, config)."] },
        { title: "Semaphore & sync.Once", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\n// Semaphore using buffered channel\ntype Semaphore struct {\n    ch chan struct{}\n}\n\nfunc NewSemaphore(max int) *Semaphore {\n    return &Semaphore{ch: make(chan struct{}, max)}\n}\n\nfunc (s *Semaphore) Acquire() { s.ch <- struct{}{} }\nfunc (s *Semaphore) Release() { <-s.ch }\n\n// sync.Once: singleton pattern\nvar (\n    instance *DB\n    once     sync.Once\n)\n\ntype DB struct{ Name string }\n\nfunc GetDB() *DB {\n    once.Do(func() {\n        fmt.Println(\"Init DB (once!)\")\n        instance = &DB{Name: \"prod\"}\n    })\n    return instance\n}\n\nfunc main() {\n    // Semaphore: max 3 concurrent\n    sem := NewSemaphore(3)\n    var wg sync.WaitGroup\n    for i := 1; i <= 8; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            sem.Acquire()\n            defer sem.Release()\n            fmt.Printf(\"Job %d running\\n\", id)\n            time.Sleep(50 * time.Millisecond)\n        }(i)\n    }\n    wg.Wait()\n    fmt.Println(\"All jobs done\")\n\n    // sync.Once\n    for i := 0; i < 3; i++ {\n        db := GetDB()\n        fmt.Println(\"DB:\", db.Name)\n    }\n}", notes: ["Buffered channel capacity = max concurrency.", "sync.Once is thread-safe singleton.", "Production: golang.org/x/sync/semaphore.Weighted."] }
      ],
      comparison: { note: "", items: [
        { from: "Java", what: "Mutex ~ synchronized/ReentrantLock. RWMutex ~ ReadWriteLock. Once ~ lazy init." },
        { from: "C++", what: "Mutex ~ std::mutex. RWMutex ~ std::shared_mutex. Once ~ std::call_once." },
        { from: "Python", what: "Mutex ~ threading.Lock. Semaphore ~ threading.Semaphore." }
      ]}
    }
  },
  {
    id: "async", title: "Async Patterns", icon: "\u{1F504}",
    content: {
      intro: "Go has no async/await. Concurrency uses goroutines, channels, and context. The context package handles cancellation, timeouts, and deadlines.",
      code: [
        { title: "Context: Cancellation & Timeouts", lang: "go", code: "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc fetchData(ctx context.Context, id int) (string, error) {\n    select {\n    case <-time.After(time.Duration(id*100) * time.Millisecond):\n        return fmt.Sprintf(\"data-%d\", id), nil\n    case <-ctx.Done():\n        return \"\", ctx.Err()\n    }\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(\n        context.Background(), 250*time.Millisecond,\n    )\n    defer cancel()\n\n    for i := 1; i <= 5; i++ {\n        result, err := fetchData(ctx, i)\n        if err != nil {\n            fmt.Printf(\"Job %d: %v\\n\", i, err)\n        } else {\n            fmt.Printf(\"Job %d: %s\\n\", i, result)\n        }\n    }\n}", notes: ["context.Context is always the first parameter.", "Always defer cancel().", "WithTimeout, WithDeadline, WithCancel."] },
        { title: "Pipeline Pattern", lang: "go", code: "package main\n\nimport \"fmt\"\n\nfunc generate(nums ...int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for _, n := range nums {\n            out <- n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc square(in <-chan int) <-chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            out <- n * n\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc filter(in <-chan int, fn func(int) bool) <-chan int {\n    out := make(chan int)\n    go func() {\n        for n := range in {\n            if fn(n) {\n                out <- n\n            }\n        }\n        close(out)\n    }()\n    return out\n}\n\nfunc main() {\n    // Pipeline: generate -> square -> filter(>10)\n    nums := generate(1, 2, 3, 4, 5, 6, 7, 8)\n    squared := square(nums)\n    big := filter(squared, func(n int) bool { return n > 10 })\n\n    for v := range big {\n        fmt.Println(v) // 16 25 36 49 64\n    }\n}", notes: ["Pipelines chain goroutines like Unix pipes.", "Close channels to signal no more data.", "Used in image processing, ETL, streaming."] },
        { title: "errgroup (Parallel + Error)", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\n// Simplified errgroup\ntype ErrGroup struct {\n    wg  sync.WaitGroup\n    mu  sync.Mutex\n    err error\n}\n\nfunc (g *ErrGroup) Go(fn func() error) {\n    g.wg.Add(1)\n    go func() {\n        defer g.wg.Done()\n        if err := fn(); err != nil {\n            g.mu.Lock()\n            if g.err == nil {\n                g.err = err\n            }\n            g.mu.Unlock()\n        }\n    }()\n}\n\nfunc (g *ErrGroup) Wait() error {\n    g.wg.Wait()\n    return g.err\n}\n\nfunc main() {\n    g := &ErrGroup{}\n    var user, order string\n\n    g.Go(func() error {\n        time.Sleep(50 * time.Millisecond)\n        user = \"alice\"\n        return nil\n    })\n    g.Go(func() error {\n        time.Sleep(30 * time.Millisecond)\n        order = \"order-100\"\n        return nil\n    })\n\n    if err := g.Wait(); err != nil {\n        fmt.Println(\"Error:\", err)\n        return\n    }\n    fmt.Println(user, order)\n}", notes: ["Production: use golang.org/x/sync/errgroup.", "Like Promise.all() in JS, asyncio.gather() in Python.", "First error wins."] }
      ],
      comparison: { note: "", items: [
        { from: "JavaScript", what: "No async/await. Goroutines + channels replace Promises." },
        { from: "Python", what: "No asyncio needed. Goroutines are truly parallel (no GIL)." },
        { from: "Java", what: "Goroutines replace CompletableFuture/ExecutorService." },
        { from: "Rust", what: "Rust needs async runtime (tokio). Go has it built in." }
      ]}
    }
  },
  {
    id: "errors", title: "Error Handling", icon: "\u{1F6E1}\u{FE0F}",
    content: {
      intro: "Go uses explicit error returns instead of exceptions.",
      code: [
        { title: "Errors, Defer, Panic, Recover", lang: "go", code: "package main\n\nimport (\n    \"errors\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc readFile(path string) (string, error) {\n    if path == \"\" {\n        return \"\", errors.New(\"empty path\")\n    }\n    data, err := os.ReadFile(path)\n    if err != nil {\n        return \"\", fmt.Errorf(\"readFile: %w\", err)\n    }\n    return string(data), nil\n}\n\nfunc safeDiv(a, b int) (result int, err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf(\"panic: %v\", r)\n        }\n    }()\n    return a / b, nil\n}\n\nfunc main() {\n    // Error handling\n    _, err := readFile(\"\")\n    fmt.Println(\"Error:\", err)\n\n    _, err = readFile(\"nope.txt\")\n    if err != nil {\n        fmt.Println(\"Error:\", err)\n        if errors.Is(err, os.ErrNotExist) {\n            fmt.Println(\"File not found\")\n        }\n    }\n\n    // Defer order (LIFO)\n    defer fmt.Println(\"defer 1\")\n    defer fmt.Println(\"defer 2\")\n\n    // Panic recovery\n    r, err := safeDiv(10, 0)\n    fmt.Println(\"SafeDiv:\", r, err)\n\n    r2, _ := safeDiv(10, 2)\n    fmt.Println(\"SafeDiv:\", r2)\n}", notes: ["%w wraps errors for unwrapping.", "if err != nil is the most common pattern.", "panic/recover is NOT for normal errors."] }
      ],
      comparison: { note: "", items: [
        { from: "Java/C++", what: "No try/catch. Explicit error returns." },
        { from: "Rust", what: "Similar: Result<T,E> vs (T, error)." }
      ]}
    }
  },
  {
    id: "collections", title: "Slices & Maps", icon: "\u{1F4DA}",
    content: {
      intro: "Slices (dynamic arrays) and maps (hash tables) are Go's core collections.",
      code: [
        { title: "Slices & Maps", lang: "go", code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Slices\n    s := []int{1, 2, 3, 4, 5}\n    s = append(s, 6, 7)\n    fmt.Println(s[1:3]) // [2 3]\n\n    dst := make([]int, len(s))\n    copy(dst, s)\n\n    // Maps\n    m := map[string]int{\"alice\": 90, \"bob\": 85}\n    m[\"charlie\"] = 95\n\n    score, ok := m[\"dave\"]\n    if !ok {\n        fmt.Println(\"dave not found, zero:\", score)\n    }\n\n    delete(m, \"bob\")\n    for k, v := range m {\n        fmt.Println(k, v)\n    }\n}", notes: ["s = append(s, ...) may reallocate.", "Map iteration is random.", "Comma-ok idiom for existence check."] }
      ],
      comparison: { note: "", items: [
        { from: "Python", what: "Slices ~ lists. Maps ~ dicts." },
        { from: "Java", what: "Slices ~ ArrayList. Maps ~ HashMap." }
      ]}
    }
  },
  {
    id: "generics", title: "Generics (1.18+)", icon: "\u{1F9EC}",
    content: {
      intro: "Type-parameterized functions and types with constraints.",
      code: [
        { title: "Generics", lang: "go", code: "package main\n\nimport \"fmt\"\n\ntype Ordered interface {\n    ~int | ~int8 | ~int16 | ~int32 | ~int64 |\n        ~float32 | ~float64 | ~string\n}\n\nfunc Min[T Ordered](a, b T) T {\n    if a < b {\n        return a\n    }\n    return b\n}\n\nfunc Filter[T any](s []T, fn func(T) bool) []T {\n    var r []T\n    for _, v := range s {\n        if fn(v) {\n            r = append(r, v)\n        }\n    }\n    return r\n}\n\nfunc Map[T any, U any](s []T, fn func(T) U) []U {\n    r := make([]U, len(s))\n    for i, v := range s {\n        r[i] = fn(v)\n    }\n    return r\n}\n\ntype Stack[T any] struct{ items []T }\n\nfunc (s *Stack[T]) Push(v T)       { s.items = append(s.items, v) }\nfunc (s *Stack[T]) Pop() (T, bool) {\n    var zero T\n    if len(s.items) == 0 {\n        return zero, false\n    }\n    top := s.items[len(s.items)-1]\n    s.items = s.items[:len(s.items)-1]\n    return top, true\n}\n\nfunc main() {\n    fmt.Println(Min(3, 7))\n    fmt.Println(Min(\"a\", \"z\"))\n\n    nums := []int{1, 2, 3, 4, 5, 6}\n    evens := Filter(nums, func(n int) bool { return n%2 == 0 })\n    fmt.Println(evens)\n\n    doubled := Map(nums, func(n int) int { return n * 2 })\n    fmt.Println(doubled)\n\n    st := &Stack[string]{}\n    st.Push(\"hello\")\n    st.Push(\"world\")\n    v, _ := st.Pop()\n    fmt.Println(v)\n}", notes: ["~int means any type with underlying int.", "'any' = interface{}.", "samber/lo for production generic utils."] }
      ],
      comparison: { note: "", items: [
        { from: "Java", what: "Type erasure vs Go's monomorphization." },
        { from: "C++", what: "Constraints ~ C++20 concepts." },
        { from: "Rust", what: "Similar to trait bounds." }
      ]}
    }
  },
  {
    id: "testing", title: "Testing", icon: "\u{1F9EA}",
    content: {
      intro: "Built into the toolchain. _test.go suffix. No framework needed.",
      code: [
        { title: "Tests & Benchmarks", lang: "go", code: "package main\n\nimport (\n    \"fmt\"\n    \"testing\"\n)\n\nfunc Add(a, b int) int { return a + b }\n\n// Save as main_test.go, run: go test -v\nfunc TestAdd(t *testing.T) {\n    if got := Add(2, 3); got != 5 {\n        t.Errorf(\"Add(2,3) = %d, want 5\", got)\n    }\n}\n\nfunc TestAdd_Table(t *testing.T) {\n    tests := []struct {\n        name     string\n        a, b, want int\n    }{\n        {\"pos\", 2, 3, 5},\n        {\"zero\", 0, 0, 0},\n        {\"neg\", -1, -2, -3},\n    }\n    for _, tt := range tests {\n        t.Run(tt.name, func(t *testing.T) {\n            if got := Add(tt.a, tt.b); got != tt.want {\n                t.Errorf(\"got %d, want %d\", got, tt.want)\n            }\n        })\n    }\n}\n\nfunc BenchmarkAdd(b *testing.B) {\n    for i := 0; i < b.N; i++ {\n        Add(2, 3)\n    }\n}\n\nfunc main() {\n    fmt.Println(\"Add(2,3)=\", Add(2, 3))\n    fmt.Println(\"Save as _test.go to run: go test -v ./...\")\n}", notes: ["go test -v ./...", "go test -bench=.", "Table-driven tests are the most common pattern."] }
      ],
      comparison: { note: "", items: [
        { from: "Python", what: "testing ~ unittest. Table ~ pytest.parametrize." },
        { from: "Java", what: "Built-in. No JUnit needed." }
      ]}
    }
  },
  dsaSection,
  {
    id: "restapi", title: "REST API (Full Example)", icon: "\u{1F310}",
    content: {
      intro: "A complete RESTful API in Go using only the standard library. This builds a Book CRUD API with JSON encoding, proper HTTP methods, route handling, and middleware. Every line is commented for learning.",
      code: [
        { title: "Complete REST API Server", lang: "go", code: "package main\n\nimport (\n    \"encoding/json\" // JSON encoding/decoding\n    \"fmt\"           // formatted I/O\n    \"log\"           // logging\n    \"net/http\"      // HTTP server and client\n    \"strings\"       // string manipulation\n    \"sync\"          // mutex for thread safety\n    \"time\"          // timestamps\n)\n\n// ============================================================\n// MODELS: Define your data structures with JSON struct tags\n// ============================================================\n\n// Book represents a book resource in our API.\n// Struct tags (`json:\"...\") control JSON field names.\n// `omitempty` means the field is omitted if it has zero value.\ntype Book struct {\n    ID        string    `json:\"id\"`\n    Title     string    `json:\"title\"`\n    Author    string    `json:\"author\"`\n    Year      int       `json:\"year,omitempty\"`\n    CreatedAt time.Time `json:\"created_at\"`\n}\n\n// APIResponse wraps all responses in a consistent format.\n// This is a common pattern for production APIs.\ntype APIResponse struct {\n    Success bool        `json:\"success\"`\n    Data    interface{} `json:\"data,omitempty\"`\n    Error   string      `json:\"error,omitempty\"`\n    Count   int         `json:\"count,omitempty\"`\n}\n\n// ============================================================\n// STORE: In-memory data store with mutex for thread safety\n// ============================================================\n\n// BookStore holds our books in memory.\n// sync.RWMutex allows multiple concurrent readers\n// but exclusive access for writers.\ntype BookStore struct {\n    mu     sync.RWMutex   // protects the map\n    books  map[string]Book // id -> book\n    nextID int             // auto-increment ID\n}\n\n// NewBookStore creates an initialized store with sample data.\nfunc NewBookStore() *BookStore {\n    store := &BookStore{\n        books:  make(map[string]Book),\n        nextID: 1,\n    }\n    // Seed with sample books\n    store.Create(Book{Title: \"The Go Programming Language\", Author: \"Donovan & Kernighan\", Year: 2015})\n    store.Create(Book{Title: \"Concurrency in Go\", Author: \"Katherine Cox-Buday\", Year: 2017})\n    store.Create(Book{Title: \"Go Web Programming\", Author: \"Sau Sheong Chang\", Year: 2016})\n    return store\n}\n\n// Create adds a new book to the store.\n// Returns the created book with generated ID and timestamp.\nfunc (s *BookStore) Create(b Book) Book {\n    s.mu.Lock()         // exclusive lock for writing\n    defer s.mu.Unlock() // always unlock when done\n\n    b.ID = fmt.Sprintf(\"%d\", s.nextID)\n    b.CreatedAt = time.Now()\n    s.nextID++\n    s.books[b.ID] = b\n    return b\n}\n\n// GetAll returns all books as a slice.\nfunc (s *BookStore) GetAll() []Book {\n    s.mu.RLock()         // read lock (multiple readers OK)\n    defer s.mu.RUnlock()\n\n    books := make([]Book, 0, len(s.books))\n    for _, b := range s.books {\n        books = append(books, b)\n    }\n    return books\n}\n\n// GetByID returns a single book by ID.\nfunc (s *BookStore) GetByID(id string) (Book, bool) {\n    s.mu.RLock()\n    defer s.mu.RUnlock()\n    b, ok := s.books[id]\n    return b, ok\n}\n\n// Update replaces a book's fields.\nfunc (s *BookStore) Update(id string, updated Book) (Book, bool) {\n    s.mu.Lock()\n    defer s.mu.Unlock()\n\n    existing, ok := s.books[id]\n    if !ok {\n        return Book{}, false\n    }\n    // Keep original ID and timestamp\n    updated.ID = existing.ID\n    updated.CreatedAt = existing.CreatedAt\n    s.books[id] = updated\n    return updated, true\n}\n\n// Delete removes a book by ID.\nfunc (s *BookStore) Delete(id string) bool {\n    s.mu.Lock()\n    defer s.mu.Unlock()\n\n    if _, ok := s.books[id]; !ok {\n        return false\n    }\n    delete(s.books, id)\n    return true\n}\n\n// ============================================================\n// MIDDLEWARE: Functions that wrap handlers\n// ============================================================\n\n// loggingMiddleware logs every request with method, path,\n// and how long it took to process.\nfunc loggingMiddleware(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        start := time.Now()\n        log.Printf(\">> %s %s\", r.Method, r.URL.Path)\n        next.ServeHTTP(w, r) // call the actual handler\n        log.Printf(\"<< %s %s [%v]\", r.Method, r.URL.Path, time.Since(start))\n    })\n}\n\n// corsMiddleware adds CORS headers for browser access.\nfunc corsMiddleware(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        w.Header().Set(\"Access-Control-Allow-Origin\", \"*\")\n        w.Header().Set(\"Access-Control-Allow-Methods\", \"GET, POST, PUT, DELETE, OPTIONS\")\n        w.Header().Set(\"Access-Control-Allow-Headers\", \"Content-Type\")\n        if r.Method == \"OPTIONS\" {\n            w.WriteHeader(http.StatusOK)\n            return\n        }\n        next.ServeHTTP(w, r)\n    })\n}\n\n// ============================================================\n// HANDLERS: HTTP request handlers for each endpoint\n// ============================================================\n\n// Helper: write JSON response with status code\nfunc writeJSON(w http.ResponseWriter, status int, data interface{}) {\n    w.Header().Set(\"Content-Type\", \"application/json\")\n    w.WriteHeader(status)\n    json.NewEncoder(w).Encode(data)\n}\n\n// BookHandler handles /api/books and /api/books/{id}\ntype BookHandler struct {\n    store *BookStore\n}\n\n// ServeHTTP routes requests based on HTTP method.\n// This implements the http.Handler interface.\nfunc (h *BookHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {\n    // Extract ID from path: /api/books/{id}\n    path := strings.TrimPrefix(r.URL.Path, \"/api/books\")\n    path = strings.TrimPrefix(path, \"/\")\n    id := strings.TrimSuffix(path, \"/\")\n\n    switch {\n    // GET /api/books - list all\n    case r.Method == \"GET\" && id == \"\":\n        h.handleList(w, r)\n\n    // GET /api/books/{id} - get one\n    case r.Method == \"GET\" && id != \"\":\n        h.handleGet(w, r, id)\n\n    // POST /api/books - create\n    case r.Method == \"POST\" && id == \"\":\n        h.handleCreate(w, r)\n\n    // PUT /api/books/{id} - update\n    case r.Method == \"PUT\" && id != \"\":\n        h.handleUpdate(w, r, id)\n\n    // DELETE /api/books/{id} - delete\n    case r.Method == \"DELETE\" && id != \"\":\n        h.handleDelete(w, r, id)\n\n    default:\n        writeJSON(w, http.StatusMethodNotAllowed,\n            APIResponse{Error: \"method not allowed\"})\n    }\n}\n\n// GET /api/books - List all books\nfunc (h *BookHandler) handleList(w http.ResponseWriter, r *http.Request) {\n    books := h.store.GetAll()\n    writeJSON(w, http.StatusOK, APIResponse{\n        Success: true,\n        Data:    books,\n        Count:   len(books),\n    })\n}\n\n// GET /api/books/{id} - Get single book\nfunc (h *BookHandler) handleGet(w http.ResponseWriter, r *http.Request, id string) {\n    book, ok := h.store.GetByID(id)\n    if !ok {\n        writeJSON(w, http.StatusNotFound,\n            APIResponse{Error: \"book not found\"})\n        return\n    }\n    writeJSON(w, http.StatusOK, APIResponse{\n        Success: true,\n        Data:    book,\n    })\n}\n\n// POST /api/books - Create new book\nfunc (h *BookHandler) handleCreate(w http.ResponseWriter, r *http.Request) {\n    var book Book\n    // Decode JSON body into struct\n    if err := json.NewDecoder(r.Body).Decode(&book); err != nil {\n        writeJSON(w, http.StatusBadRequest,\n            APIResponse{Error: \"invalid JSON: \" + err.Error()})\n        return\n    }\n    // Validate required fields\n    if book.Title == \"\" || book.Author == \"\" {\n        writeJSON(w, http.StatusBadRequest,\n            APIResponse{Error: \"title and author are required\"})\n        return\n    }\n    created := h.store.Create(book)\n    writeJSON(w, http.StatusCreated, APIResponse{\n        Success: true,\n        Data:    created,\n    })\n}\n\n// PUT /api/books/{id} - Update book\nfunc (h *BookHandler) handleUpdate(w http.ResponseWriter, r *http.Request, id string) {\n    var book Book\n    if err := json.NewDecoder(r.Body).Decode(&book); err != nil {\n        writeJSON(w, http.StatusBadRequest,\n            APIResponse{Error: \"invalid JSON: \" + err.Error()})\n        return\n    }\n    updated, ok := h.store.Update(id, book)\n    if !ok {\n        writeJSON(w, http.StatusNotFound,\n            APIResponse{Error: \"book not found\"})\n        return\n    }\n    writeJSON(w, http.StatusOK, APIResponse{\n        Success: true,\n        Data:    updated,\n    })\n}\n\n// DELETE /api/books/{id} - Delete book\nfunc (h *BookHandler) handleDelete(w http.ResponseWriter, r *http.Request, id string) {\n    if !h.store.Delete(id) {\n        writeJSON(w, http.StatusNotFound,\n            APIResponse{Error: \"book not found\"})\n        return\n    }\n    writeJSON(w, http.StatusOK, APIResponse{\n        Success: true,\n        Data:    \"book deleted\",\n    })\n}\n\n// ============================================================\n// MAIN: Wire everything together and start the server\n// ============================================================\n\nfunc main() {\n    store := NewBookStore()\n    bookHandler := &BookHandler{store: store}\n\n    // Create a new ServeMux (router)\n    mux := http.NewServeMux()\n\n    // Health check endpoint\n    mux.HandleFunc(\"/api/health\", func(w http.ResponseWriter, r *http.Request) {\n        writeJSON(w, http.StatusOK, map[string]string{\"status\": \"ok\"})\n    })\n\n    // Book routes - handles both /api/books and /api/books/{id}\n    mux.Handle(\"/api/books\", bookHandler)\n    mux.Handle(\"/api/books/\", bookHandler)\n\n    // Apply middleware chain: cors -> logging -> handler\n    handler := corsMiddleware(loggingMiddleware(mux))\n\n    // Start server\n    addr := \":8080\"\n    fmt.Println(\"=== Go REST API Server ===\")\n    fmt.Println(\"Listening on http://localhost\" + addr)\n    fmt.Println(\"\")\n    fmt.Println(\"Try these curl commands:\")\n    fmt.Println(\"  curl localhost:8080/api/health\")\n    fmt.Println(\"  curl localhost:8080/api/books\")\n    fmt.Println(\"  curl localhost:8080/api/books/1\")\n    fmt.Println(\"  curl -X POST localhost:8080/api/books -d '{\\\"title\\\":\\\"New Book\\\",\\\"author\\\":\\\"Me\\\"}'\")\n    fmt.Println(\"  curl -X PUT localhost:8080/api/books/1 -d '{\\\"title\\\":\\\"Updated\\\",\\\"author\\\":\\\"You\\\"}'\")\n    fmt.Println(\"  curl -X DELETE localhost:8080/api/books/1\")\n    fmt.Println(\"\")\n    log.Fatal(http.ListenAndServe(addr, handler))\n}", notes: [
            "ZERO external dependencies. Only the Go standard library.",
            "Thread-safe with sync.RWMutex (safe for concurrent requests).",
            "Middleware pattern: functions wrapping http.Handler (like Express middleware).",
            "struct tags (`json:\"name\"`) control JSON field names.",
            "json.NewEncoder(w).Encode() streams JSON directly to response writer.",
            "For production: use chi or gin for routing, and a real database."
          ] }
      ],
      comparison: { note: "", items: [
        { from: "Node/Express", what: "app.get('/books', handler) vs mux.HandleFunc. Middleware pattern is very similar." },
        { from: "Python/Flask", what: "@app.route('/books') vs mux.Handle. Go has no decorators." },
        { from: "Java/Spring", what: "@RestController/@GetMapping vs explicit handler registration. Go is more manual but simpler." }
      ]}
    }
  },
  {
    id: "grpc", title: "gRPC in Go", icon: "\u{1F4E1}",
    content: {
      intro: "gRPC is a high-performance RPC framework that uses Protocol Buffers for serialization. It is faster than REST for service-to-service communication, supports streaming, and generates type-safe client/server code from .proto files.",
      code: [
        { title: "Step 1: Define .proto file", lang: "protobuf", code: "// book.proto\n// This file defines the service contract and message types.\n// Protocol Buffers (protobuf) is the serialization format.\n// Both server and client are generated from this single file.\n\nsyntax = \"proto3\"; // Use proto3 syntax (latest)\n\npackage bookstore;  // Package namespace\n\n// Go-specific: controls the generated Go package path\noption go_package = \"github.com/user/bookstore/proto\";\n\n// ============================================================\n// MESSAGES: Define your data structures\n// These are like Go structs but cross-language compatible.\n// ============================================================\n\n// Book is the core resource.\n// Each field has a unique number (1, 2, 3...) used in binary encoding.\nmessage Book {\n    string id     = 1;  // unique identifier\n    string title  = 2;  // book title\n    string author = 3;  // author name\n    int32  year   = 4;  // publication year\n}\n\n// Request/Response messages for each RPC method.\n// It's a gRPC convention to have dedicated message types.\n\nmessage CreateBookRequest {\n    string title  = 1;\n    string author = 2;\n    int32  year   = 3;\n}\n\nmessage GetBookRequest {\n    string id = 1;\n}\n\nmessage ListBooksRequest {\n    // empty: returns all books\n}\n\nmessage ListBooksResponse {\n    repeated Book books = 1;  // 'repeated' = slice/list\n    int32 count = 2;\n}\n\nmessage DeleteBookRequest {\n    string id = 1;\n}\n\nmessage DeleteBookResponse {\n    bool success = 1;\n}\n\n// ============================================================\n// SERVICE: Define the RPC methods (the API contract)\n// This generates both server interface and client stub.\n// ============================================================\n\nservice BookService {\n    // Unary RPCs (request -> response, like REST)\n    rpc CreateBook(CreateBookRequest) returns (Book);\n    rpc GetBook(GetBookRequest) returns (Book);\n    rpc ListBooks(ListBooksRequest) returns (ListBooksResponse);\n    rpc DeleteBook(DeleteBookRequest) returns (DeleteBookResponse);\n\n    // Server streaming: server sends multiple responses\n    // Client calls once, receives a stream of books.\n    rpc WatchBooks(ListBooksRequest) returns (stream Book);\n}", notes: [
            "Install: go install google.golang.org/protobuf/cmd/protoc-gen-go@latest",
            "Install: go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest",
            "Generate: protoc --go_out=. --go-grpc_out=. book.proto",
            "This generates: book.pb.go (messages) and book_grpc.pb.go (service)."
          ] },
        { title: "Step 2: gRPC Server Implementation", lang: "go", code: "// server/main.go\npackage main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"log\"\n    \"net\"\n    \"sync\"\n    \"time\"\n\n    // These are generated from the .proto file\n    pb \"github.com/user/bookstore/proto\"\n\n    \"google.golang.org/grpc\"\n    \"google.golang.org/grpc/codes\"\n    \"google.golang.org/grpc/status\"\n)\n\n// ============================================================\n// SERVER: Implement the BookService interface\n// The generated code creates an interface you must satisfy.\n// ============================================================\n\n// bookServer implements the generated BookServiceServer interface.\n// This is similar to implementing an interface in Java.\ntype bookServer struct {\n    // Embed the unimplemented server for forward compatibility.\n    // This means new RPC methods won't break your code.\n    pb.UnimplementedBookServiceServer\n\n    mu     sync.RWMutex\n    books  map[string]*pb.Book\n    nextID int\n}\n\nfunc newBookServer() *bookServer {\n    return &bookServer{\n        books:  make(map[string]*pb.Book),\n        nextID: 1,\n    }\n}\n\n// CreateBook handles the CreateBook RPC.\n// context.Context carries deadlines, cancellation, and metadata.\nfunc (s *bookServer) CreateBook(\n    ctx context.Context,\n    req *pb.CreateBookRequest,\n) (*pb.Book, error) {\n    // Validate input\n    if req.Title == \"\" {\n        // gRPC uses status codes instead of HTTP status codes\n        return nil, status.Errorf(codes.InvalidArgument, \"title is required\")\n    }\n\n    s.mu.Lock()\n    defer s.mu.Unlock()\n\n    book := &pb.Book{\n        Id:     fmt.Sprintf(\"%d\", s.nextID),\n        Title:  req.Title,\n        Author: req.Author,\n        Year:   req.Year,\n    }\n    s.nextID++\n    s.books[book.Id] = book\n\n    log.Printf(\"Created book: %s\", book.Title)\n    return book, nil\n}\n\n// GetBook handles the GetBook RPC.\nfunc (s *bookServer) GetBook(\n    ctx context.Context,\n    req *pb.GetBookRequest,\n) (*pb.Book, error) {\n    s.mu.RLock()\n    defer s.mu.RUnlock()\n\n    book, ok := s.books[req.Id]\n    if !ok {\n        // NOT_FOUND is the gRPC equivalent of HTTP 404\n        return nil, status.Errorf(codes.NotFound, \"book %s not found\", req.Id)\n    }\n    return book, nil\n}\n\n// ListBooks returns all books.\nfunc (s *bookServer) ListBooks(\n    ctx context.Context,\n    req *pb.ListBooksRequest,\n) (*pb.ListBooksResponse, error) {\n    s.mu.RLock()\n    defer s.mu.RUnlock()\n\n    books := make([]*pb.Book, 0, len(s.books))\n    for _, b := range s.books {\n        books = append(books, b)\n    }\n    return &pb.ListBooksResponse{\n        Books: books,\n        Count: int32(len(books)),\n    }, nil\n}\n\n// WatchBooks is a server-streaming RPC.\n// It sends all current books one by one, then can watch for new ones.\nfunc (s *bookServer) WatchBooks(\n    req *pb.ListBooksRequest,\n    stream pb.BookService_WatchBooksServer, // generated stream interface\n) error {\n    s.mu.RLock()\n    defer s.mu.RUnlock()\n\n    for _, book := range s.books {\n        // Send each book as a separate message\n        if err := stream.Send(book); err != nil {\n            return err\n        }\n        time.Sleep(500 * time.Millisecond) // simulate delay\n    }\n    return nil\n}\n\nfunc main() {\n    // Listen on TCP port 50051 (gRPC convention)\n    lis, err := net.Listen(\"tcp\", \":50051\")\n    if err != nil {\n        log.Fatalf(\"failed to listen: %v\", err)\n    }\n\n    // Create a new gRPC server\n    grpcServer := grpc.NewServer()\n\n    // Register our service implementation\n    pb.RegisterBookServiceServer(grpcServer, newBookServer())\n\n    fmt.Println(\"=== gRPC Server ===\")\n    fmt.Println(\"Listening on :50051\")\n    log.Fatal(grpcServer.Serve(lis))\n}", notes: [
            "gRPC uses status codes (NOT_FOUND, INVALID_ARGUMENT, etc.) instead of HTTP codes.",
            "context.Context is always the first parameter (carries deadlines, cancellation).",
            "UnimplementedBookServiceServer provides forward compatibility.",
            "Server streaming: call stream.Send() multiple times to send a stream of responses."
          ] },
        { title: "Step 3: gRPC Client", lang: "go", code: "// client/main.go\npackage main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"io\"\n    \"log\"\n    \"time\"\n\n    pb \"github.com/user/bookstore/proto\"\n\n    \"google.golang.org/grpc\"\n    \"google.golang.org/grpc/credentials/insecure\"\n)\n\nfunc main() {\n    // ========================================\n    // CONNECT: Dial the gRPC server\n    // ========================================\n    conn, err := grpc.Dial(\n        \"localhost:50051\",\n        grpc.WithTransportCredentials(insecure.NewCredentials()),\n    )\n    if err != nil {\n        log.Fatalf(\"failed to connect: %v\", err)\n    }\n    defer conn.Close()\n\n    // Create a typed client from the generated code.\n    // This client has methods matching the .proto service definition.\n    client := pb.NewBookServiceClient(conn)\n\n    // Set a timeout for all operations\n    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)\n    defer cancel()\n\n    // ========================================\n    // CREATE: Call CreateBook RPC\n    // ========================================\n    book, err := client.CreateBook(ctx, &pb.CreateBookRequest{\n        Title:  \"Learning Go\",\n        Author: \"Jon Bodner\",\n        Year:   2021,\n    })\n    if err != nil {\n        log.Fatalf(\"CreateBook failed: %v\", err)\n    }\n    fmt.Printf(\"Created: %+v\\n\", book)\n\n    // ========================================\n    // GET: Call GetBook RPC\n    // ========================================\n    got, err := client.GetBook(ctx, &pb.GetBookRequest{Id: book.Id})\n    if err != nil {\n        log.Fatalf(\"GetBook failed: %v\", err)\n    }\n    fmt.Printf(\"Got: %+v\\n\", got)\n\n    // ========================================\n    // LIST: Call ListBooks RPC\n    // ========================================\n    list, err := client.ListBooks(ctx, &pb.ListBooksRequest{})\n    if err != nil {\n        log.Fatalf(\"ListBooks failed: %v\", err)\n    }\n    fmt.Printf(\"All books (%d):\\n\", list.Count)\n    for _, b := range list.Books {\n        fmt.Printf(\"  - %s by %s (%d)\\n\", b.Title, b.Author, b.Year)\n    }\n\n    // ========================================\n    // STREAM: Call WatchBooks (server streaming)\n    // ========================================\n    stream, err := client.WatchBooks(ctx, &pb.ListBooksRequest{})\n    if err != nil {\n        log.Fatalf(\"WatchBooks failed: %v\", err)\n    }\n    fmt.Println(\"\\nStreaming books:\")\n    for {\n        book, err := stream.Recv()\n        if err == io.EOF {\n            break // stream ended\n        }\n        if err != nil {\n            log.Fatalf(\"stream error: %v\", err)\n        }\n        fmt.Printf(\"  >> %s by %s\\n\", book.Title, book.Author)\n    }\n\n    fmt.Println(\"\\nDone!\")\n}", notes: [
            "The client is fully type-safe. Auto-generated from the .proto file.",
            "grpc.Dial connects to the server (like http.Client for REST).",
            "Server streaming: call stream.Recv() in a loop until io.EOF.",
            "gRPC is ~10x faster than JSON REST for serialization/deserialization."
          ] },
        { title: "REST vs gRPC Comparison", lang: "text", code: "Feature           | REST (JSON/HTTP)      | gRPC (Protobuf/HTTP2)\n-----------------------------------------------------------------\nFormat            | JSON (text, human-     | Protobuf (binary,\n                  | readable)              | compact)\n-----------------------------------------------------------------\nProtocol          | HTTP/1.1 or HTTP/2     | HTTP/2 only\n-----------------------------------------------------------------\nContract          | OpenAPI/Swagger (opt.) | .proto file (required)\n-----------------------------------------------------------------\nCode Gen          | Optional               | Built-in (many langs)\n-----------------------------------------------------------------\nStreaming         | WebSockets/SSE (hack)  | Native (4 types)\n-----------------------------------------------------------------\nPerformance       | Good                   | Excellent (~10x faster)\n-----------------------------------------------------------------\nBrowser Support   | Native                 | Needs grpc-web proxy\n-----------------------------------------------------------------\nDebugging         | Easy (curl, Postman)   | Harder (need grpcurl)\n-----------------------------------------------------------------\nBest For          | Public APIs, web       | Microservices,\n                  | frontends, mobile      | internal services,\n                  |                        | high performance\n-----------------------------------------------------------------\n\nWhen to use REST:\n- Public APIs consumed by browsers\n- Simple CRUD applications\n- When human readability matters\n- Third-party integrations\n\nWhen to use gRPC:\n- Microservice-to-microservice communication\n- Real-time streaming (chat, live data)\n- Performance-critical systems\n- When you need strong typing across services\n\nSetup commands:\n  go install google.golang.org/protobuf/cmd/protoc-gen-go@latest\n  go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest\n  protoc --go_out=. --go-grpc_out=. book.proto", notes: [
            "gRPC supports 4 streaming types: unary, server, client, and bidirectional.",
            "Protobuf is 5-10x smaller than JSON and 10x faster to parse.",
            "gRPC auto-generates clients in Go, Python, Java, TypeScript, C++, etc.",
            "For browser access to gRPC, use grpc-gateway or grpc-web proxy."
          ] }
      ],
      comparison: { note: "", items: [
        { from: "REST", what: "JSON over HTTP. Human-readable. Browser-native. Best for public APIs." },
        { from: "gRPC", what: "Protobuf over HTTP/2. Binary, fast. Best for internal microservices." },
        { from: "GraphQL", what: "Client specifies exact fields. Good for complex UIs. Go libs: gqlgen, graphql-go." },
        { from: "WebSocket", what: "Full-duplex. Go's gorilla/websocket or nhooyr.io/websocket." }
      ]}
    }
  },
  {
    id: "libraries", title: "Popular Libraries", icon: "\u{1F4E6}",
    content: {
      intro: "Go's standard library covers most needs. These popular packages fill the gaps.",
      libraries: [
        { category: "Web Frameworks", items: [
          { name: "gin-gonic/gin", desc: "High-performance HTTP framework", stars: "79k+" },
          { name: "gofiber/fiber", desc: "Express.js-inspired, fasthttp", stars: "34k+" },
          { name: "labstack/echo", desc: "Minimalist, extensible", stars: "30k+" },
          { name: "go-chi/chi", desc: "Lightweight, net/http compatible", stars: "18k+" }
        ]},
        { category: "Database & ORM", items: [
          { name: "go-gorm/gorm", desc: "Full ORM: migrations, hooks", stars: "37k+" },
          { name: "sqlc-dev/sqlc", desc: "Type-safe Go from SQL", stars: "13k+" },
          { name: "jmoiron/sqlx", desc: "Extensions to database/sql", stars: "16k+" },
          { name: "go-redis/redis", desc: "Redis client", stars: "20k+" }
        ]},
        { category: "Utilities", items: [
          { name: "samber/lo", desc: "Lodash for Go (generics)", stars: "18k+" },
          { name: "spf13/cast", desc: "Safe type casting", stars: "4k+" },
          { name: "mitchellh/mapstructure", desc: "Decode maps to structs", stars: "8k+" }
        ]},
        { category: "CLI & Config", items: [
          { name: "spf13/cobra", desc: "CLI framework (Docker, K8s use it)", stars: "39k+" },
          { name: "spf13/viper", desc: "Config: JSON, YAML, env, flags", stars: "28k+" }
        ]},
        { category: "Logging", items: [
          { name: "uber-go/zap", desc: "Blazing fast structured logger", stars: "22k+" },
          { name: "rs/zerolog", desc: "Zero-alloc JSON logger", stars: "11k+" }
        ]},
        { category: "Testing & Concurrency", items: [
          { name: "stretchr/testify", desc: "Assert, require, mock", stars: "24k+" },
          { name: "sourcegraph/conc", desc: "Structured concurrency", stars: "9k+" },
          { name: "panjf2000/ants", desc: "Goroutine pool", stars: "13k+" }
        ]},
        { category: "gRPC & Protobuf", items: [
          { name: "grpc/grpc-go", desc: "Official Go gRPC implementation", stars: "21k+" },
          { name: "grpc-ecosystem/grpc-gateway", desc: "gRPC to REST proxy", stars: "18k+" },
          { name: "bufbuild/buf", desc: "Modern protobuf tooling", stars: "9k+" },
          { name: "connectrpc/connect-go", desc: "Better gRPC-compatible framework", stars: "3k+" }
        ]}
      ]
    }
  }
];

const themes = {
  light: {
    "--bg": "#f8f9fc", "--sidebar-bg": "#ffffff", "--card-bg": "#ffffff", "--header-bg": "#f0f2f8",
    "--code-bg": "#1e1e2e", "--code-text": "#cdd6f4", "--border": "#e2e5ef", "--text-primary": "#1a1d2e",
    "--text-secondary": "#5b6078", "--accent": "#3b82f6", "--accent-dim": "rgba(59,130,246,0.08)",
    "--note-bg": "#f5f7ff", "--compare-bg": "rgba(59,130,246,0.04)", "--compare-border": "rgba(59,130,246,0.15)",
    "--compare-title": "#2563eb", "--tag-bg": "rgba(59,130,246,0.1)", "--tag-text": "#2563eb",
    "--star-bg": "rgba(234,179,8,0.1)", "--star-text": "#b45309", "--hover-bg": "#f0f2f8",
    "--active-bg": "rgba(59,130,246,0.08)", "--active-text": "#2563eb",
    "--shadow": "0 1px 3px rgba(0,0,0,0.06)", "--nav-active-indicator": "#3b82f6",
    "--progress-bg": "#e2e5ef", "--progress-fill": "#3b82f6", "--breadcrumb": "#94a3b8",
    "--dsa-sub-bg": "#f0f4ff", "--dsa-sub-border": "#dbe4ff"
  },
  dark: {
    "--bg": "#0f1117", "--sidebar-bg": "#161822", "--card-bg": "#1a1d2e", "--header-bg": "#1e2235",
    "--code-bg": "#0d0f18", "--code-text": "#c9d1d9", "--border": "#2a2e42", "--text-primary": "#e0e4f0",
    "--text-secondary": "#8b90a5", "--accent": "#60a5fa", "--accent-dim": "rgba(96,165,250,0.12)",
    "--note-bg": "#141726", "--compare-bg": "rgba(96,165,250,0.06)", "--compare-border": "rgba(96,165,250,0.2)",
    "--compare-title": "#93bbfc", "--tag-bg": "rgba(96,165,250,0.15)", "--tag-text": "#93bbfc",
    "--star-bg": "rgba(250,204,21,0.12)", "--star-text": "#fbbf24", "--hover-bg": "#1e2235",
    "--active-bg": "rgba(96,165,250,0.12)", "--active-text": "#60a5fa",
    "--shadow": "0 1px 3px rgba(0,0,0,0.3)", "--nav-active-indicator": "#60a5fa",
    "--progress-bg": "#2a2e42", "--progress-fill": "#60a5fa", "--breadcrumb": "#6b7280",
    "--dsa-sub-bg": "#161822", "--dsa-sub-border": "#2a2e42"
  }
};

function copyText(text) {
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return true;
  } catch (e) {
    return false;
  }
}

function CodeBlock({ code, title, notes, lang }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    if (copyText(code)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <div style={{ marginBottom: 18, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
      <div style={{ background: "var(--header-bg)", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>{title}</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {lang && <span style={{ fontSize: 10, background: "var(--tag-bg)", color: "var(--tag-text)", padding: "2px 8px", borderRadius: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{lang}</span>}
          <button onClick={doCopy} style={{ background: copied ? "var(--accent)" : "transparent", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 11, color: copied ? "#fff" : "var(--text-secondary)", transition: "all 0.2s", fontWeight: 500 }}>{copied ? "Copied!" : "Copy"}</button>
        </div>
      </div>
      <pre style={{ margin: 0, padding: 16, overflowX: "auto", fontSize: 12.5, lineHeight: 1.65, background: "var(--code-bg)", color: "var(--code-text)", fontFamily: "'Fira Code','SF Mono','Consolas',monospace" }}><code>{code}</code></pre>
      {notes && notes.length > 0 && (
        <div style={{ padding: "10px 16px", background: "var(--note-bg)", borderTop: "1px solid var(--border)" }}>
          {notes.map((n, i) => (
            <div key={i} style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: i < notes.length - 1 ? 4 : 0, display: "flex", gap: 8, lineHeight: 1.5 }}>
              <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: 10, marginTop: 3 }}>{"\u25CF"}</span>
              <span>{n}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ComparisonBox({ comparison }) {
  if (!comparison || (!comparison.note && (!comparison.items || comparison.items.length === 0))) return null;
  return (
    <div style={{ background: "var(--compare-bg)", border: "1px solid var(--compare-border)", borderRadius: 12, padding: 18, marginTop: 20, boxShadow: "var(--shadow)" }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12, color: "var(--compare-title)", display: "flex", alignItems: "center", gap: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{"\u{1F504}"} Language Comparisons</div>
      {comparison.note && <p style={{ fontSize: 12.5, color: "var(--text-secondary)", marginBottom: 12, fontStyle: "italic" }}>{comparison.note}</p>}
      {comparison.items && comparison.items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ background: "var(--tag-bg)", color: "var(--tag-text)", padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, flexShrink: 0, minWidth: 70, textAlign: "center" }}>{item.from}</span>
          <span style={{ fontSize: 12.5, color: "var(--text-primary)", lineHeight: 1.5 }}>{item.what}</span>
        </div>
      ))}
    </div>
  );
}

function LibrarySection({ libraries }) {
  return (
    <div>{libraries.map((cat, ci) => (
      <div key={ci} style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "var(--accent)", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 3, height: 18, background: "var(--accent)", borderRadius: 2, display: "inline-block" }} />{cat.category}
        </h3>
        <div style={{ display: "grid", gap: 8 }}>
          {cat.items.map((lib, li) => (
            <div key={li} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, boxShadow: "var(--shadow)" }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontFamily: "monospace", fontWeight: 600, fontSize: 12.5, color: "var(--accent)" }}>{lib.name}</span>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", margin: "3px 0 0" }}>{lib.desc}</p>
              </div>
              <span style={{ fontSize: 10, background: "var(--star-bg)", color: "var(--star-text)", padding: "2px 8px", borderRadius: 10, flexShrink: 0, fontWeight: 700 }}>{lib.stars}</span>
            </div>
          ))}
        </div>
      </div>
    ))}</div>
  );
}

export default function GoLearningHub() {
  const [active, setActive] = useState("origins");
  const [theme, setTheme] = useState("light");
  const [sidebar, setSidebar] = useState(false);
  const [dsaSub, setDsaSub] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const t = themes[theme];
  const sec = useMemo(() => sections.find(function(s) { return s.id === active; }), [active]);
  const idx = sections.findIndex(function(s) { return s.id === active; });
  const progress = ((idx + 1) / sections.length) * 100;
  const isDSA = active === "dsa";
  const dsaSubs = isDSA ? sec.content.subsections : [];

  const nav = useCallback(function(id) { setActive(id); setSidebar(false); setDsaSub(0); }, []);

  const sidebarCSS = isMobile
    ? { width: 270, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)", position: "fixed", top: 0, bottom: 0, left: sidebar ? 0 : -270, zIndex: 100, transition: "left 0.25s", overflowY: "auto", display: "flex", flexDirection: "column" }
    : { width: 270, background: "var(--sidebar-bg)", borderRight: "1px solid var(--border)", position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column", flexShrink: 0 };

  return (
    <div style={{ ...t, fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", color: "var(--text-primary)", background: "var(--bg)", minHeight: "100vh", display: "flex", transition: "background 0.3s, color 0.3s" }}>
      {sidebar && isMobile && <div onClick={function() { setSidebar(false); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 99 }} />}

      <aside style={sidebarCSS}>
        <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>Go</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Go Learning Hub</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 1 }}>Interactive Course</div>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-secondary)", marginBottom: 5 }}>
              <span>Progress</span><span>{idx + 1} of {sections.length}</span>
            </div>
            <div style={{ height: 4, background: "var(--progress-bg)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: progress + "%", background: "var(--progress-fill)", borderRadius: 2, transition: "width 0.3s" }} />
            </div>
          </div>
        </div>
        <nav style={{ padding: "10px 8px", flex: 1, overflowY: "auto" }}>
          {sections.map(function(s, i) {
            var isAct = active === s.id;
            return (
              <button key={s.id} onClick={function() { nav(s.id); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", background: isAct ? "var(--active-bg)" : "transparent", border: "none", borderRadius: 8, cursor: "pointer", color: isAct ? "var(--active-text)" : "var(--text-secondary)", fontWeight: isAct ? 600 : 400, fontSize: 13, textAlign: "left", transition: "all 0.15s", marginBottom: 1, borderLeft: isAct ? "3px solid var(--nav-active-indicator)" : "3px solid transparent" }}>
                <span style={{ fontSize: 15, width: 22, textAlign: "center" }}>{s.icon}</span>
                <span style={{ flex: 1 }}>{s.title}</span>
                {i <= idx && <span style={{ fontSize: 10, color: "var(--accent)", opacity: 0.7 }}>{"\u2713"}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "10px 18px", borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--text-secondary)" }}>
          {sections.length} sections. All Go code is runnable.
        </div>
      </aside>

      <main style={{ flex: 1, minWidth: 0 }}>
        <header style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--sidebar-bg)", borderBottom: "1px solid var(--border)", padding: "0 20px", display: "flex", alignItems: "center", gap: 12, height: 56, boxShadow: "var(--shadow)" }}>
          {isMobile && <button onClick={function() { setSidebar(true); }} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: "var(--text-secondary)", fontSize: 18, lineHeight: 1 }}>{"\u2630"}</button>}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, overflow: "hidden" }}>
            <span style={{ fontSize: 11, color: "var(--breadcrumb)" }}>Go Course</span>
            <span style={{ fontSize: 11, color: "var(--breadcrumb)" }}>/</span>
            <span style={{ fontSize: 15 }}>{sec ? sec.icon : ""}</span>
            <span style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sec ? sec.title : ""}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{idx + 1}/{sections.length}</span>
            <button onClick={function() { setTheme(theme === "light" ? "dark" : "light"); }} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "var(--text-primary)", transition: "all 0.2s" }}>
              {theme === "light" ? "\u{1F319}" : "\u{2600}\u{FE0F}"}
            </button>
          </div>
        </header>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px 80px" }}>
          {sec && (
            <React.Fragment>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{sec.icon} {sec.title}</h1>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, color: "var(--text-secondary)", marginTop: 10 }}>{sec.content.intro}</p>
              </div>

              {sec.content.principles && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 24 }}>
                  {sec.content.principles.map(function(p, i) {
                    return (
                      <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", boxShadow: "var(--shadow)" }}>
                        <div style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)", marginBottom: 4 }}>{p.label}</div>
                        <div style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {isDSA && (
                <React.Fragment>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                    {dsaSubs.map(function(sub, i) {
                      return (
                        <button key={i} onClick={function() { setDsaSub(i); }} style={{ padding: "6px 14px", borderRadius: 8, border: dsaSub === i ? "1.5px solid var(--accent)" : "1px solid var(--border)", background: dsaSub === i ? "var(--active-bg)" : "var(--card-bg)", color: dsaSub === i ? "var(--active-text)" : "var(--text-secondary)", fontSize: 12, fontWeight: dsaSub === i ? 600 : 400, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                          {sub.title}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ background: "var(--dsa-sub-bg)", border: "1px solid var(--dsa-sub-border)", borderRadius: 12, padding: "20px 16px", marginBottom: 8 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "var(--text-primary)" }}>{dsaSubs[dsaSub].title}</h2>
                    <CodeBlock code={dsaSubs[dsaSub].code} title={dsaSubs[dsaSub].title} notes={dsaSubs[dsaSub].notes} lang={dsaSubs[dsaSub].lang} />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 20 }}>
                    {dsaSub > 0 && <button onClick={function() { setDsaSub(dsaSub - 1); }} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "var(--text-secondary)", fontSize: 13 }}>{"\u2190"} {dsaSubs[dsaSub - 1].title}</button>}
                    <div style={{ flex: 1 }} />
                    {dsaSub < dsaSubs.length - 1 && <button onClick={function() { setDsaSub(dsaSub + 1); }} style={{ background: "var(--active-bg)", border: "1px solid var(--compare-border)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "var(--active-text)", fontSize: 13, fontWeight: 600 }}>{dsaSubs[dsaSub + 1].title} {"\u2192"}</button>}
                  </div>
                </React.Fragment>
              )}

              {sec.content.code && sec.content.code.map(function(block, i) {
                return <CodeBlock key={i} code={block.code} title={block.title} notes={block.notes} lang={block.lang} />;
              })}

              {sec.content.libraries && <LibrarySection libraries={sec.content.libraries} />}

              <ComparisonBox comparison={sec.content.comparison} />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, gap: 12, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                {idx > 0 ? (
                  <button onClick={function() { nav(sections[idx - 1].id); }} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px", cursor: "pointer", color: "var(--text-secondary)", fontSize: 13, display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow)", maxWidth: "45%" }}>
                    <span>{"\u2190"}</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 10, color: "var(--breadcrumb)", marginBottom: 2 }}>Previous</div>
                      <div style={{ fontWeight: 600 }}>{sections[idx - 1].icon} {sections[idx - 1].title}</div>
                    </div>
                  </button>
                ) : <div />}
                {idx < sections.length - 1 ? (
                  <button onClick={function() { nav(sections[idx + 1].id); }} style={{ background: "var(--active-bg)", border: "1px solid var(--compare-border)", borderRadius: 10, padding: "14px 20px", cursor: "pointer", color: "var(--active-text)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, boxShadow: "var(--shadow)", maxWidth: "45%" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>Next</div>
                      <div>{sections[idx + 1].icon} {sections[idx + 1].title}</div>
                    </div>
                    <span>{"\u2192"}</span>
                  </button>
                ) : <div />}
              </div>
            </React.Fragment>
          )}
        </div>
      </main>
    </div>
  );
}
