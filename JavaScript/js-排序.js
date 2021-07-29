/* JavaScript -- 排序 */
// 基本排序算法
//   基本排序的基本思想非常类似，重排列时用的技术基本都是一组嵌套的 for 循环：外循环遍历数组的每一项，内循环则用于比较元素。

/*  
冒泡排序
冒泡排序原理：
 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
 2. 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
 3. 针对所有的元素重复以上的步骤，除了最后一个。
 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比比较。
*/
function bubleSort(arr) {
    let len = arr.length;
    for (let outer = len; outer >= 2; outer--) {
        for (let inner = 0; inner <= outer - 1; inner++) {
            if (arr[inner] > arr[inner + 1]) {
                // ES6 解构赋值
                [arr[inner], arr[inner + 1]] = [arr[inner + 1], arr[inner]];
            }
        }
    }
    return arr;
}
//  1. 外层循环，从最大值开始递减，因为内层是两两比较，因此最外侧当 >= 2 时即可停止；
//  2. 内层是两两比较，从 0 开始，比较 inner 和 inner + 1 ，因此，临界条件是 inner <= outer - 1 ;

//  选择排序
//   选择排序是从数组的开头开始，将第一个元素和其他元素作比较，检查完所有的元素后，最小的放在第一个位置，接下来再开始从第二个元素开始，重复以上一直到最后。

function selectSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i; j < len; j++) {
            if (arr[j] < arr[i]) {
                // ES6 解构赋值
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}
//  1. 外层循环的 i 表示第几轮，arr [i] 就表示当前轮次最靠前 (小) 的位置；
//  2. 内层从 i 开始，以此往后数，找到比开头小的，互换位置即可。

// 插入排序
//   原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。就像打扑克牌一样，接起来一张，放哪里无所谓，再接起来一张，比第一张小，放左边，继续接，可能是中间数，就插在中间。

function insertSort(arr) {
    let len = arr.length;
    // 外循环从1开始，默认arr[0]是有序段
    for (let i = 1; i < len; i++) {
        // j = i, 将arr[j]依次插入有序段中
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}
//  1. i 是外循环，依次把最后面的数插入前面的有序序列中，默认 arr [0] 为有序的，i 就从 1 开始
//  2. j 进来后，依次与前面队列的数进行比较，因为前面的序列是有序的，因此只需要循环比较、交换即可
//  3. 注意这里的 break，因为前面的都是有序的序列，所以如果当前要插入的 值 arr [j] 大于或等于 arr [j - 1], 则无线继续比较，直接下一次循环就可以了

// 高级排序算法
/*  
快速排序
  快排是处理大数据最快的排序算法之一。它是一种分而治之的算法，通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。该算法不断重复这个步骤直至所有数据都是有序的。
原理：
 1. 选择一个基准元素，将列表分割成两个子序列；
 2. 对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；
 3. 分别对较小元素的子序列和较大元素的子序列重复步骤 1 和 2
*/
function quickSort(arr) {
    if (arr.length <= 1) {
        // 递归出口
        return arr;
    }

    let left = [],
        right = [],
        current = arr.splice(0, 1); // 删掉数组中的第一个元素，返回被删掉的元素

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < current) {
            // 放在左边
            left.push(arr[i]);
        } else {
            // 放在右边
            right.push(arr[i]);
        }
    }

    // 递归
    // concat () 方法用于连接两个或多个数组。
    return this.quickSort(left).concat(current, this.quickSort(right));
}

// 希尔排序
//  希尔排序是插入排序的改良算法，但是核心理念与插入算法又不同，它会先比较距离较远的元素，而非相邻的元素。
//  基本思想：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录基本有序时，在对全体记录进行依次直接插入排序。
//  算法步骤：
// 1. 选择一个增量序列 t1, t2, ..., tk, 其中 ti > tj, tk = 1;
// 2. 按增量序列个数 k, 对序列进行 k 趟排序；
// 3. 每趟排序，根据对应的增量 ti, 将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序，仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。
function shellSort(arr) {
    let len = arr.length,
        gap = 1; // 定义增量

    // 设置增量为原数组长度的一半
    gap = parseInt(len / 2);

    // 控制增量
    for (gap; gap >= 1; gap = parseInt(gap / 2)) {
        console.log('----------gap === ' + gap);

        // 循环整个数组
        for (let i = gap; i < len; i++) {
            // 循环每个小组内的数字
            for (let j = i - gap; j >= 0; j -= gap) {
                // 比较大小，交换位置
                if (arr[j] > arr[j + gap]) {
                    [arr[j], arr[j + gap]] = [arr[j + gap], arr[j]];
                } else {
                    break;
                }
            }
        }
    }
    return arr;
}

// 归并排序
//  思想：将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

// 拆分
function mergeSort(arr) {
    if (arr.length == 1) {
        return arr;
    };

    let mid = Math.floor(arr.length / 2);
    // slice()方法可以从已有的数组中返回选定的元素
    let left_arr = arr.slice(0, mid);
    let right_arr = arr.slice(mid);

    // 递归
    return this.merge(this.mergeSort(left_arr), this.mergeSort(right_arr));
}

// 判断合并
function merge(left, right) {
    let result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            // shift()方法用于把数组的第一个元素删除，并返回第一个元素的值
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}