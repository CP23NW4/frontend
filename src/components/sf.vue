<script setup>


</script>
<template>
    <div class="w-72 h-96 pb-32 bg-white rounded-2xl shadow flex-col justify-start items-center inline-flex">
  <div class="h-96 bg-white flex-col justify-start items-start inline-flex">
    <div class="self-stretch h-16 flex-col justify-start items-start gap-2 flex">
      <div class="self-stretch h-16 px-4 py-3 flex-col justify-center items-start flex">
        <div class="self-stretch px-3 py-2 bg-white rounded-md shadow border border-gray-300 justify-start items-center gap-2 inline-flex">
          <div class="w-5 h-5 relative"></div>
          <div class="text-gray-500 text-base font-normal font-['Inter'] leading-normal">Search all inboxes</div>
        </div>
      </div>
    </div>
    <div class="h-96 bg-white flex-col justify-start items-start flex">
      <div class="self-stretch h-96 px-2 py-3 flex-col justify-start items-start gap-2 flex">
        <div class="self-stretch px-3 py-2 rounded-md justify-start items-center inline-flex">
          <div class="text-gray-900 text-base font-medium font-['Inter'] leading-normal">ประเภท</div>
        </div>
        <div class="self-stretch px-3 justify-start items-start gap-4 inline-flex">
          <div class="p-2.5 rounded-full border-2 border-blue-600 flex-col justify-center items-center gap-2 inline-flex"></div>
          <div class="p-2.5 rounded-full border-2 border-blue-600 flex-col justify-center items-center gap-2 inline-flex"></div>
        </div>
        <div class="self-stretch px-3 py-2 rounded-md justify-start items-center inline-flex">
          <div class="text-gray-900 text-base font-medium font-['Inter'] leading-normal">เพศ</div>
        </div>
        <div class="self-stretch px-3 justify-start items-start gap-4 inline-flex">
          <div class="px-3 py-1.5 bg-blue-600 rounded-full justify-center items-center gap-2 flex">
            <div class="w-4 h-4 relative"></div>
            <div class="text-center text-white text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">เพศผู้</div>
          </div>
          <div class="px-3 py-1.5 rounded-full border-2 border-blue-600 justify-center items-center gap-2 flex">
            <div class="w-4 h-4 relative"></div>
            <div class="text-center text-blue-600 text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">เพศเมีย</div>
          </div>
        </div>
        <div class="self-stretch px-3 py-2 rounded-md justify-start items-center inline-flex">
          <div class="text-gray-900 text-base font-medium font-['Inter'] leading-normal">สี</div>
        </div>
        <div class="self-stretch px-3 justify-start items-start gap-4 inline-flex">
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <div class="px-4 py-1.5 rounded-full border-2 border-blue-600 justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-orange-500 rounded-full"></div>
              </div>
              <div class="text-center text-blue-600 text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">ส้ม</div>
            </div>
            <div class="px-4 py-1.5 bg-blue-600 rounded-full justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-white rounded-full"></div>
              </div>
              <div class="text-center text-white text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">น้ำตาล</div>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <div class="px-4 py-1.5 rounded-full border-2 border-blue-600 justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-black rounded-full"></div>
              </div>
              <div class="text-center text-blue-600 text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">ดำ</div>
            </div>
            <div class="px-4 py-1.5 bg-blue-600 rounded-full justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-white rounded-full"></div>
              </div>
              <div class="text-center text-white text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">สามสี</div>
            </div>
          </div>
        </div>
        <div class="self-stretch px-3 justify-start items-start gap-4 inline-flex">
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <div class="px-4 py-1.5 rounded-full border-2 border-blue-600 justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-orange-500 rounded-full"></div>
              </div>
              <div class="text-center text-blue-600 text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">ลายสลิด</div>
            </div>
            <div class="px-4 py-1.5 bg-blue-600 rounded-full justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-white rounded-full"></div>
              </div>
              <div class="text-center text-white text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">นวล</div>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-1 inline-flex">
            <div class="px-4 py-1.5 rounded-full border-2 border-blue-600 justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-black rounded-full"></div>
              </div>
              <div class="text-center text-blue-600 text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">ด่าง</div>
            </div>
            <div class="px-4 py-1.5 bg-blue-600 rounded-full justify-center items-center gap-2 inline-flex">
              <div class="w-4 h-4 relative">
                <div class="w-4 h-4 left-0 top-0 absolute bg-white rounded-full"></div>
              </div>
              <div class="text-center text-white text-sm font-semibold font-['Prompt'] leading-snug tracking-tight">บลาๆ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>