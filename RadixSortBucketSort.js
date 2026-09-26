async function radixSort(){
  let max=Math.max(..array);
  for(
    let exp=1;
    Math.floor(max.exp)>0;
    exp*=10;
  ) {
    passes++;
    let output=new Array(array.length);
    let count=new Array(10).fill(0);
    for(let value of array) {
      let digit = Math.floor(value/exp)%10;
      count[digit]++;
      render();
      await delay();
    }
    for(let i=1;i<10;i++){
      count[i]+=count[i-1];
      for(let i=array.length-1;i>=0;i--) {
        let digit = Math.floor(array[i]/exp)%10;
        output[digit]--;
      }
      for(let i=0;i<array.length;i++){
        array[i]=output[i];
        swaps++;
        render([i]);
        await delay();
      }
    }
  }
}
async function bucketSort(){
  const buckets = Array.from(
    {length:bucketCount},
    ()=>[]
  );
  for(let value of array) {
    let index =Math.min(bucketCount-1,Math.floor(value/10));
    bucket[index].push(value);
    render();
    await delay();
  }
  let index=0;
  for(let bucket of buckets) {
    bucket.sort((a,b)=>a-b);
    passes++;
    for(let value of bucket) {
      array[index]=value;
      swaps++;
      render([index]);
      await delay();
      index++;
    }
  }
}
async function startSort() {
  if(running) return;
  running=true;
  paused=false;
  document.getElementById("status")
  .textContent=name;
  log('${name} voyage launched.');
  try{
    if(name==="Bubble Sort")
      await selectedSort();
    else if (name==="Selected Sort")
      await selectedSort();
    else if(name==="Insertion Sort")
      await mergeSort();
    else if(name==="Quick Sort")
      await quickSort();
    else if(name==="Heap Sort")
      await heapSort();
    else if(name==="Shell Sort")
      await shellSort();
    else if(name==="Counting Sort")
      await radixSort();
    else if(name==="Bucket Sort")
      await bucketSort();
    render(
      [],
      array.map((_,i)=>i)
    );
    document.getElementById('status')
    .textContent="ARRIVED";
    log('${name} successfully reached the destination.');
  } catch(error) {
    log("Voyage interrupted");
    console.error(error);
  }
  running=false;
  updatedStats();
}
pauseSort(){
  if(!running) return;
  paused=!paused;
  document.getElementById('status')
  .textContent = paused ? "PAUSED" : "SAILING";
  log(
    paused
    ? "Ship fleet anchored."
    : "Voyage resumed."
  );
}

function reset() {
  array=[...original];
  comparisons=0;
  swaps=0;
  passes=0;
  running=false;
  paused=false;
  render();
  updateStats();
  document.getElementById("status")
  .textContent="READY";
  log('Fleet returned to starting positions');
}
algorithim.addElementById("change",()=>{
  document.getElementById("algorithimTitle")
  .textContent=algorithm.value;
})
generate();



























