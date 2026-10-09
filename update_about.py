import re

with open('src/components/AboutSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove CurvedTimelinePath
content = re.sub(r'function CurvedTimelinePath.*?</svg>\s*\}\s*', '', content, flags=re.DOTALL)

# 2. Remove refs and useEffect for heights
content = re.sub(r'  const pathaoConnectorRef = useRef.*?(?=  const \[isHistoryExpanded)', '', content, flags=re.DOTALL)

# 3. Remove Previous Roles from Left Column
content = re.sub(r'          \{/\* Previous Roles \(Left Column\) \*/\}.*?          </div>\s*</div>\s*\{/\* Right Column', '        </div>\n\n        {/* Right Column', content, flags=re.DOTALL)

# 4. Replace Right Column My Work History
new_work_history = """          {/* My work history Sub-section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2"
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-2xl sm:text-3xl font-bold font-space text-white tracking-tight">
                My work history
              </h4>
              <span className="text-xs font-mono text-neutral-400">
                5+ Years Experience
              </span>
            </div>

            <div className="space-y-3 relative z-10">
              {workHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#141316] border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 transition-all group relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="text-base sm:text-lg font-bold font-space text-white tracking-tight group-hover:text-[#bb031c] transition-colors">
                        {item.company}
                      </h5>
                      <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-0.5">
                        {item.role} {item.location && <span className="text-neutral-500 font-normal">· {item.location}</span>}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 shrink-0">
                      {item.period}
                    </span>
                  </div>
                  {item.description && (
                    <div className="mt-3 text-xs sm:text-[13px] text-neutral-400 leading-relaxed border-t border-white/[0.05] pt-3 whitespace-pre-wrap">
                      {renderBold(item.description)}
                    </div>
                  )}
                  {item.proofLine && (
                    <div className="mt-2.5 text-[11px] sm:text-xs text-[#bb031c] font-mono tracking-wide font-medium">
                      {item.proofLine}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"""
content = re.sub(r'          \{/\* My work history Sub-section \*/\}.*?}\s*$', new_work_history, content, flags=re.DOTALL)

with open('src/components/AboutSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
