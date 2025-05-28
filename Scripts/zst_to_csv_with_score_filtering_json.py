import zstandard as zstd
import json
import sys
import os

def process_pushshift_zst(input_path, output_path, subreddit_filter, score_threshold):
    if not os.path.isfile(input_path):
        print(f"Error: File '{input_path}' not found.")
        return

    with open(input_path, 'rb') as f, open(output_path, 'w', encoding='utf-8') as out_file:
        dctx = zstd.ZstdDecompressor()
        stream_reader = dctx.stream_reader(f)
        buffer = b''
        for chunk in iter(lambda: stream_reader.read(2**20), b''):
            buffer += chunk
            lines = buffer.split(b'\n')
            buffer = lines.pop()  # Save the last partial line for the next iteration

            for line in lines:
                if not line.strip():
                    continue
                try:
                    post = json.loads(line)
                    if post.get('subreddit') != subreddit_filter:
                        continue
                    if post.get('score', 0) <= score_threshold:
                        continue

                    if len(post.get('body', '').strip()) < 120:
                        continue

                    # result = {
                    #     'score': post.get('score'),
                    #     'timestamp': post.get('created_utc')
                    # }
                    
                    result = {}

                    # For submissions
                    if 'title' in post:
                        title = post.get('title', '').strip()
                        body = post.get('selftext', '').strip()
                        result['body'] = title + " " + body
                    # For comments
                    else:
                        result['body'] = post.get('body', '').strip()

                    out_file.write(json.dumps(result) + '\n')

                except json.JSONDecodeError:
                    continue

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python filter_pushshift.py <input_file.zst> <output_file.jsonl>")
        sys.exit(1)

    input_filename = sys.argv[1]
    output_filename = sys.argv[2]
    process_pushshift_zst(
        input_path=input_filename,
        output_path=output_filename,
        subreddit_filter='climbharder',
        score_threshold=20
    )

