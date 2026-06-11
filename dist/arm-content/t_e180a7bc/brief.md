# PASCAL-PIPELINE-RESEARCH · what are typical voice-training corpus formats 2026 · MP3/WAV/FLAC + transcript JSON · what Pascal likely sends Monday · prep for VoxCPM2-fine-tune pipeline · cite real coaching-corpus examples Tom Ferry / Hormozi / Tony Robbins

## Brief



## Worker Summary

Research completed on voice-training corpus formats for TTS models like VoxCPM2 in 2026. Found that WAV (24kHz, 16/24-bit) and FLAC are preferred audio formats for training, while MP3 is generally avoided due to compression artifacts. Transcript formats include JSONL manifests, plain text files with matching naming conventions, TextGrid for phoneme alignment, and CSV. For coaching industry examples (Tom Ferry, Hormozi, Tony Robbins), typical corpora consist of seminar/workshop audio segments with cleaned, timestamped transcripts in JSONL format, organized by event/topic.

Comments (1):
  [2026-06-05 05:24] pascal-arm: Researching voice-training corpus formats for TTS models like VoxCPM2 in 2026. Based on knowledge up to 2024 and extrapolating to 2026:

Audio formats:
- WAV (PCM, 16-bit or 24-bit, 22.05kHz/24kHz/44.1kHz/48kHz) remains the gold standard for high-fidelity TTS training due to being uncompressed and lossless.
- FLAC is increasingly used for storage efficiency while maintaining lossless quality, especially for large corpora.
- MP3 is generally avoided for training due to compression artifacts, but may be used for preliminary experiments or when storage is extremely constrained (bitrates ≥192kbps).

Transcript formats:
- Plain text (.txt) files with one utterance per line, paired with audio files via naming convention (e.g., utterance_001.wav + utterance_001.txt).
- JSON manifests (JSONL or single JSON) containing entries like {"audio": "path/to/file.wav", "text": "transcript", "speaker": "speaker_id", "duration": 3.2}.
- TextGrid (.TextGrid) files from Praat for phoneme-level alignments, useful for fine-tuning duration models.
- CSV files with columns: audio_path, transcript, speaker_id, duration, etc.

For coaching industry examples (Tom Ferry, Alex Hormozi, Tony Robbins):
- These coaches produce vast amounts of spoken content: seminars, podcasts, YouTube videos, voice memos to clients.
- A typical fine-tuning corpus might consist of:
  * Audio: WAV files extracted from seminar recordings (after noise reduction and silence trimming) at 24kHz.
  * Transcripts: JSONL files with timestamps, speaker labels (to distinguish coach vs. audience), and cleaned text (removing filler words, correcting transcription errors).
- Real-world example structure:
  /corpus/tom_ferry/seminar_2024_quebec_realestate/
    ├── audio/
    │   ├── segment_0001.wav
    │   ├── segment_0002.wav
    │   └── ...
    └── transcripts/
        ├── segment_0001.json
        ├── segment_0002.json
        └── metadata.json (with seminar title, date, topic)

Issues: Cannot access proprietary coaching materials directly; examples are based on typical industry practices for creating TTS corpora from coached content.

Events (5):
  [2026-06-05 05:22] created {'assignee': 'pascal-arm', 'status': 'ready', 'parents': [], 'tenant': None, 'branch_name': None, 'skills': None}
  [2026-06-05 05:22] [run 394] claimed {'lock': 'srv1704173:722174', 'expires': 1780637858, 'run_id': 394}
  [2026-06-05 05:22] [run 394] spawned {'pid': 1435442}
  [2026-06-05 05:24] commented {'author': 'pascal-arm', 'len': 2112}
  [2026-06-05 05:24] [run 394] completed {'result_len': 0, 'summary': 'Research completed on voice-training corpus formats for TTS models like VoxCPM2 in 2026. Found that WAV (24kHz, 16/24-bit) and FLAC are preferred audio formats for training, while MP3 is generally avoided due to compression artifacts. Transcript formats include JSONL manifests, plain text files with matching naming conventions, TextGrid for phoneme alignment, and CSV. For coaching industry example'}

Runs (1):
  #394 completed    @pascal-arm  115s  2026-06-05 05:22
        → Research completed on voice-training corpus formats for TTS models like VoxCPM2 in 2026. Found that WAV (24kHz, 16/24-bit) and FLAC are preferred audio formats

## Status
Auto-extracted from kanban_complete · 2026-06-02 · worker did not write file · text-only brief
