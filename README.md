
 ## Commands
 **To start open-webui**
```docker compose up -d```

**To view a live log stream**
```docker compose logs -f open-webui```

**To build model** 
```ollama create trainerGemma3 -f /models/trainerGemma3```

**To execute commands within the docker container**
```docker exec -it ollama bash```

**To restart or stop ollama**
```systemctl restart ollama``` or ```systemctl stop ollama```




## Project journal
#### Friday, May 23 -- Installing ollama and open-webui, system prompts

After downloading both programs, I spent a while on a couple tasks:

 - Figuring out how to get ollama to use the GPU. I ended up needing to switch drivers and install additional cuda drivers, as well as tell ollama to run expecting a specific CUDA version. This took a while but was ultimately successful.

 - Figuring out how to launch them such that open-webui would "see" ollama. The way I settled on was to launch them both in the same docker container with docker compose, because otherwise the containerized open-webui won't see ollama on localhost. However, this runs into the issue of resource allocation -- either the docker container is not allocated enough resources, or ollama is not able to utilize GPU hardware acceleration and is entirely CPU-bound. In either case, running the model with ollama is very slow. I will have to rethink my deployment approach in the future.

I settled on Gemma3 for the initial version of the project. I experimented with custom prompting, and was able to successfully get the model to behave in the role I assigned to it. It's advice was pretty good, though typically generic and a bit overly cautious for my liking. When I spoke to it as a user with a mild-to-moderate overuse strain in a specific part of the body, it recommended I cease all gym training for 6 weeks. It also recommended I see a doctor and do not take medical advice from it every time I mentioned an injury, which is good advice.

Next I want to experiment further with optimized system prompts, and begin exploring LoRA fine-tuning, RAG or CAG,

#### Sunday, May 25 -- 
I started todays session thinking about LoRA fine-tuning to generate adapters. I planned to try to process reddit posts into Q&A data to feed into an adapter. However, the data I was interested in (the r/climbharder subreddit, which contains a lot of high quality discussion of sports medicine as it pertains to climbing) seemed to be in more of a discussion format, with few of the highest-voted posts being user questions. So instead, I am looking into RAG.

Step 1 - Retrieving data
I found a lot of advice mentioning pushshift, but was sad to see it's out of commission since reddit increased their API pricing model to an insane degree, killing a ton of cool open source projects. However, there appear to be dumps of the top 40,000 subreddits until ~2024. After downloading the dumps sections I wanted (r/climbharder comments and r/climbharder submissions) from [here](https://academictorrents.com/details/1614740ac8c94505e4ecb9d88be8bed7b6afddd4/tech&filelist=1) I began trying to figure out how to read them. Downloads were in a ZStandard compressed NDJson format, and larger than a typical text editor can handle (hundreds of mb). I could write a script to extract the needed fields, but I had to understand the structure of the data first.


I need to figure out which parts of the dataset will be useful for retrieval.

I want:
- submissions
    - title
    - body
    - score
- top-level comments
- timestamp? probably not, data on this subject won't go bad with age.

I ended up parsing the zst-compressed ndjs line-by-line using a modified version of a script from [here](https://github.com/Watchful1/PushshiftDumps/blob/master/scripts).

#### Monday, May 26 --
Today I started by continuing my RAG pre-processing task. I modified the script to remove unneeded fields 


# Thinks I want to learn more about
*This ongoing list is here to keep track of concepts I want to explore more. Since I am largely new to personally interacting with LLMs, there are a number of things I have next to no knowledge about but am curious about. A checkbox indicates I have done some amount of research into a topic, but does not connote expertise of any degree*

[x] The various layers of an LLM
[ ] Embedding layer
[ ] Recurrent layer
[ ] Feedforward layer
[ ] Attention layer

# Resources used
1. Ollama
2. Open WebUI
2. Reddit.com/r/datasets
4. https://www.reddit.com/r/pushshift/comments/1itme1k/separate_dump_files_for_the_top_40k_subreddits/
5. https://academictorrents.com/details/1614740ac8c94505e4ecb9d88be8bed7b6afddd4/tech&filelist=1
5. https://github.com/Watchful1/PushshiftDumps/blob/master/scripts/filter_file.py
6. https://github.com/Watchful1/PushshiftDumps/blob/master/scripts/single_file.py
5. A survey of datasets in medicine for large language models, Zhang, Xue, et al.