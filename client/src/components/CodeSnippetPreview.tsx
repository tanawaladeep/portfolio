import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Snippet {
  id: string;
  filename: string;
  language: string;
  category: string;
  code: string;
  output: string[];
}

const snippets: Snippet[] = [
  {
    id: 'medicine-service',
    filename: 'MedicineInventoryService.java',
    language: 'Java',
    category: 'Core Java & OOP',
    code: `package com.deeptanawala.medicineshop.service;

import com.deeptanawala.medicineshop.model.MedicineBatch;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class MedicineInventoryService implements InventoryAuditable {
    private final MedicineRepository repository;

    public MedicineInventoryService(MedicineRepository repository) {
        this.repository = repository;
    }

    /**
     * Audits inventory for critical threshold stock & expiring batches
     */
    public List<MedicineBatch> auditExpiringBatches(int warningDays) {
        LocalDate alertCutoff = LocalDate.now().plusDays(warningDays);
        
        return repository.findAllActiveBatches().stream()
            .filter(batch -> batch.getExpiryDate().isBefore(alertCutoff))
            .filter(batch -> batch.getCurrentStock() > 0)
            .sorted((b1, b2) -> b1.getExpiryDate().compareTo(b2.getExpiryDate()))
            .collect(Collectors.toList());
    }
}`,
    output: [
      '[INFO] Initializing MedicineInventoryService context...',
      '[DEBUG] Connected to MySQL database via HikariCP pool [active: 4, idle: 8]',
      '[AUDIT] Scanning pharmaceutical batches with expiry warning threshold: 30 days',
      '[RESULT] Found 3 batches nearing expiry (Paracetamol 650mg, Amoxicillin 500mg)',
      '[SUCCESS] Expiry warning notifications dispatched to Pharmacist dashboard.',
      '[METRIC] Execution time: 14ms | Memory: 18.2 MB | Status: OK'
    ],
  },
  {
    id: 'lru-cache',
    filename: 'LRUCache.java',
    language: 'Java',
    category: 'DSA & Big-O',
    code: `package com.deeptanawala.dsa.cache;

import java.util.HashMap;
import java.util.Map;

/**
 * High-performance LRU Cache implementing O(1) get & put
 * using HashMap + Doubly Linked List.
 */
public class LRUCache<K, V> {
    private class Node {
        K key;
        V value;
        Node prev, next;
        Node(K k, V v) { this.key = k; this.value = v; }
    }

    private final int capacity;
    private final Map<K, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        head.next = tail;
        tail.prev = head;
    }

    public synchronized V get(K key) {
        Node node = map.get(key);
        if (node == null) return null;
        moveToHead(node);
        return node.value;
    }
}`,
    output: [
      '[TEST] Running LRUCacheBenchmarkTest (JUnit 5)...',
      '[ASSERT] Initial capacity = 10,000 entries',
      '[BENCHMARK] 1,000,000 randomized get/put operations executed',
      '[STATS] Average Get Latency: 0.0004 ms (O(1) verified)',
      '[STATS] Cache Hit Ratio: 94.6%',
      '[PASS] LRU eviction order strictly validated. All tests passed.'
    ],
  },
  {
    id: 'db-transaction',
    filename: 'TransactionManager.java',
    language: 'Java',
    category: 'DBMS & JDBC',
    code: `package com.deeptanawala.medicineshop.db;

import java.sql.Connection;
import java.sql.SQLException;

public class TransactionManager {
    private final ConnectionPool pool;

    public TransactionManager(ConnectionPool pool) {
        this.pool = pool;
    }

    public <T> T executeInTransaction(TransactionCallable<T> action) throws SQLException {
        try (Connection conn = pool.getConnection()) {
            conn.setAutoCommit(false); // ACID Transaction Boundary
            try {
                T result = action.execute(conn);
                conn.commit();
                return result;
            } catch (Exception ex) {
                conn.rollback(); // Rollback on failure
                throw new SQLException("Transaction aborted: " + ex.getMessage(), ex);
            }
        }
    }
}`,
    output: [
      '[DB] Initializing ACID transaction boundary for Order #DT-8821',
      '[SQL] UPDATE inventory_stock SET quantity = quantity - 5 WHERE item_id = 104',
      '[SQL] INSERT INTO invoice_items (order_id, item_id, price) VALUES (?, ?, ?)',
      '[SQL] INSERT INTO sales_ledger (amount, tax, timestamp) VALUES (?, ?, NOW())',
      '[COMMIT] Transaction successfully committed. 0 rollbacks.',
      '[STATUS] ACID compliance guaranteed. Isolation Level: TRANSACTION_READ_COMMITTED'
    ],
  },
];

export const CodeSnippetPreview: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(snippets[0].id);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showConsole, setShowConsole] = useState<boolean>(false);

  const activeSnippet = snippets.find((s) => s.id === selectedId) || snippets[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowConsole(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-dark-900/90 shadow-2xl overflow-hidden glass-panel">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-dark-950/60 gap-2">
        {/* Window controls & file tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/70 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
          </div>
          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {snippets.map((snippet) => (
              <button
                key={snippet.id}
                onClick={() => {
                  setSelectedId(snippet.id);
                  setShowConsole(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 whitespace-nowrap ${
                  selectedId === snippet.id
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <span>{snippet.filename}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors border border-slate-800"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-all shadow-sm active:scale-95"
            title="Execute Code Simulation"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 overflow-x-auto max-h-[340px] text-xs sm:text-sm font-mono leading-relaxed bg-dark-950/40">
        <pre className="text-slate-300">
          <code>
            {activeSnippet.code.split('\n').map((line, index) => {
              // Simple syntax coloring highlights
              let lineColored = (
                <span className="text-slate-300">{line}</span>
              );

              if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                lineColored = <span className="text-slate-500 italic">{line}</span>;
              } else if (line.trim().startsWith('package ') || line.trim().startsWith('import ')) {
                lineColored = <span className="text-purple-400">{line}</span>;
              } else if (
                line.includes('public class ') ||
                line.includes('public interface ') ||
                line.includes('class Node')
              ) {
                lineColored = <span className="text-amber-300 font-semibold">{line}</span>;
              } else if (line.includes('return ') || line.includes('public ') || line.includes('private ')) {
                lineColored = <span className="text-blue-400">{line}</span>;
              }

              return (
                <div key={index} className="table-row">
                  <span className="table-cell select-none pr-4 text-right text-slate-600 w-8">
                    {index + 1}
                  </span>
                  <span className="table-cell">{lineColored}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Terminal Output Panel */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-800 bg-dark-950/95 p-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-slate-300">Java Virtual Machine (OpenJDK 21) Output</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Sparkles className="w-3 h-3" /> Simulation Complete
              </span>
            </div>
            <div className="space-y-1 text-slate-300">
              {activeSnippet.output.map((outLine, idx) => {
                let color = 'text-slate-300';
                if (outLine.includes('[SUCCESS]') || outLine.includes('[PASS]')) color = 'text-emerald-400';
                if (outLine.includes('[WARN]') || outLine.includes('[AUDIT]')) color = 'text-amber-400';
                if (outLine.includes('[DEBUG]') || outLine.includes('[INFO]')) color = 'text-blue-400';
                if (outLine.includes('[METRIC]') || outLine.includes('[STATS]')) color = 'text-indigo-400';

                return (
                  <div key={idx} className={`${color} leading-5`}>
                    {outLine}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info Pill */}
      <div className="px-4 py-2 bg-dark-950/80 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          Focus: <strong className="text-slate-300">{activeSnippet.category}</strong>
        </span>
        <span className="font-mono text-slate-500">UTF-8 • Java 21 • Strict Mode</span>
      </div>
    </div>
  );
};
